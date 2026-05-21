import { userApi } from "@/api/user";

/**
 * Determines where to send the user after login/signup based on onboarding status.
 *
 * - Setup incomplete (no exchange) → /setup
 * - No active subscription → /setup/choose-plan
 * - Everything complete → /dashboard
 */
export async function getPostLoginRoute(): Promise<string> {
  // ── WAITLIST MODE ────────────────────────────────────────────────
  // Plan picker + Binance connect are hidden from the user area for
  // the email-collection phase. Every authenticated user goes
  // straight to /dashboard — legacy users (already connected
  // exchange + active plan) get their read-only dashboard; new
  // users see empty-state dashboards. The redirect branches below
  // are kept intact so reverting this function restores the full
  // funnel in one paste.
  return "/dashboard";

  /*
  try {
    const { data } = await userApi.getOnboardingStatus();

    if (data.isSuccess && data.data) {
      const status = data.data;

      if (!status.hasActiveExchange) return "/setup";
      if (!status.hasActiveSubscription) return "/setup/choose-plan";
      if (status.setupComplete) return "/dashboard";
    }
  } catch {
    // If the check fails, fall back to setup
  }

  return "/setup";
  */
}
