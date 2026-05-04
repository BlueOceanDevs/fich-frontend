import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiResponse } from "./types";
import { isPublicPath } from "@/utils/publicPaths";

// ─────────────────────────────────────────────
// Axios instance
// ─────────────────────────────────────────────

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:7100/api",
  withCredentials: true, // send cookies (access_token, refresh_token) on every request
  headers: {
    "Content-Type": "application/json",
  },
});

// ─────────────────────────────────────────────
// Auth-clear callback — set by _app.tsx so we
// can clear Redux state without importing the
// store directly (avoids circular deps).
// ─────────────────────────────────────────────

let onAuthExpired: (() => void) | null = null;

export function setOnAuthExpired(cb: () => void) {
  onAuthExpired = cb;
}

// ─────────────────────────────────────────────
// Public-page check — uses the centralized list in
// utils/publicPaths.ts so we don't drift from the OnboardingGuard's
// version (the previous local copy was missing /contact, /performance,
// /faq, /plans, /terms, /privacy-policy, /risk-disclosure — which
// caused unauthenticated visitors to those pages to get bounced to
// /login after the bootstrap fetchUser() returned 401).
// ─────────────────────────────────────────────

function isPublicPage(): boolean {
  if (typeof window === "undefined") return true;
  return isPublicPath(window.location.pathname);
}

// ─────────────────────────────────────────────
// Response interceptor – auto refresh on 401
// ─────────────────────────────────────────────

let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (cfg: InternalAxiosRequestConfig) => void;
  reject: (err: unknown) => void;
}> = [];

function drainQueue(error: unknown = null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    // After refresh the cookies are already updated –
    // just retry with the same config.
    else resolve({} as InternalAxiosRequestConfig);
  });
  pendingQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse>) => {
    const original = error.config as InternalAxiosRequestConfig & {
      _retried?: boolean;
    };

    // Only attempt refresh on 401, and never retry more than once
    const isUnauthorized = error.response?.status === 401;
    const isRefreshCall = original?.url?.includes("/auth/Refresh");

    if (!isUnauthorized || original?._retried || isRefreshCall) {
      return Promise.reject(error);
    }

    // If another call is already refreshing, queue this one
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then(() => {
        original._retried = true;
        return api(original);
      });
    }

    isRefreshing = true;
    original._retried = true;

    try {
      await api.post("/auth/Refresh");
      drainQueue();
      return api(original);
    } catch (refreshError) {
      drainQueue(refreshError);

      // Clear auth state so the UI reflects logged-out
      onAuthExpired?.();

      // Only redirect to login if the user is on a protected page
      if (typeof window !== "undefined" && !isPublicPage()) {
        window.location.href = "/login";
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
