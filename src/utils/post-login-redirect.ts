import { userApi } from "@/api/user";

/**
 * Determines where to send the user after login/signup based on onboarding status.
 *
 * - Setup incomplete (no exchange) → /setup
 * - No active subscription → /setup/choose-plan
 * - Everything complete → /dashboard
 */
export async function getPostLoginRoute(): Promise<string> {
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
}
