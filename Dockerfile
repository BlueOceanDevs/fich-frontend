# syntax=docker/dockerfile:1.7
# ──────────────────────────────────────────────────────────────
# fich-frontend — Next.js production image (standalone output)
#
# 3-stage build:
#   deps    — install node_modules from lockfile (cacheable layer).
#   builder — copy source, bake NEXT_PUBLIC_* env into the client
#             bundle via build-args, run `next build`. The output:
#             "standalone" mode in next.config.ts produces a self-
#             contained server.js + node_modules at .next/standalone.
#   runner  — minimal final image: alpine + node + the standalone
#             bundle + the public/ folder (standalone doesn't include
#             it automatically) + static assets. Runs as a non-root
#             user. ~150 MB final.
#
# Build-args (NEXT_PUBLIC_*) become PART OF THE CLIENT BUNDLE — they
# are not secrets, just compile-time configuration baked into JS.
# Each environment (prod / staging) needs its own image build.
# ──────────────────────────────────────────────────────────────

# ─── 1. deps ──────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ─── 2. builder ───────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Build-time public env. Default values are the dev fallbacks the
# axios client already uses — overridden by the GitHub Actions
# workflow with the prod values (`https://api.fich.ai/api`).
ARG NEXT_PUBLIC_API_URL=https://localhost:7100/api
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID=""
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ─── 3. runner ────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Non-root user — Next.js's own Docker docs use the same pair.
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# `output: "standalone"` puts server.js + a pruned node_modules at
# .next/standalone — copy that as the runtime root. Static assets
# (.next/static and public/) must be copied alongside it because
# the standalone bundler intentionally leaves them out.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
