/**
 * Single source of truth for paths that don't require authentication.
 *
 * Used by:
 *   - `api/client.ts` — to decide whether a failed token refresh
 *     should bounce the user to `/login` (yes for protected pages,
 *     no for public ones).
 *   - `components/OnboardingGuard` — to decide whether a logged-in
 *     user with incomplete onboarding should be force-redirected to
 *     `/setup` (skip the redirect on these paths so users can still
 *     reach legal pages, marketing content, and email-flow landings
 *     without finishing setup first).
 *
 * Anything truly public (no auth required to view) goes here. Adding
 * a new public page? Add its path to this list and you're done — both
 * the API client and the OnboardingGuard will see it.
 *
 * Use `isPublicPath()` to test a path against this list, including
 * the `/setup/` prefix match for the multi-step setup flow's nested
 * routes.
 */
export const PUBLIC_PATHS: readonly string[] = [
  // Marketing / informational
  "/",
  "/performance",
  "/faq",
  "/plans",
  "/contact",

  // Legal pages
  "/privacy-policy",
  "/terms",
  "/risk-disclosure",

  // Auth flow (not yet logged in)
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/confirm-email",
  // Post-signup landing during waitlist mode (collects emails only;
  // the user is technically authenticated by the time signup pushes
  // them here, but listing it keeps the unauth-then-refresh case
  // working too).
  "/thank-you",

  // Email-flow landings (token-authenticated, not session-authenticated)
  "/unsubscribe",

  // Payment-gateway return URLs (Cryptomus / Stripe redirect here
  // after a checkout completes; user may or may not still have a
  // valid session at that point).
  "/payment/success",
  "/payment/cancel",
];

/**
 * Returns true if `path` is a public route. Matches exactly OR by
 * the `/setup/` prefix (which covers `/setup/choose-plan`,
 * `/setup/connect-exchange`, etc. without needing to enumerate them
 * — those screens have their own internal auth gates).
 *
 * The `/setup/` prefix match exists for the OnboardingGuard's use
 * case (don't loop a logged-in user back to `/setup` while they're
 * already navigating the setup flow). The bare `/setup` page itself
 * has its own guard and doesn't need to be in this list.
 */
export function isPublicPath(path: string): boolean {
  return PUBLIC_PATHS.includes(path) || path.startsWith("/setup/");
}
