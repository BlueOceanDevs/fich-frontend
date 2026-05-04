import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { userApi } from "@/api/user";
import { SpinnerLarge } from "@/components/ui/Button";

/**
 * Pages that don't require onboarding completion. A logged-in user
 * who hasn't finished onboarding visiting any of these paths is
 * allowed through (no /setup redirect). Categories covered:
 *
 *   - Auth flow: /login, /signup, /forgot-password, /reset-password,
 *     /confirm-email
 *   - Public marketing pages: /, /performance, /faq, /contact,
 *     /plans
 *   - Legal documents: /privacy-policy, /terms, /risk-disclosure
 *   - User self-management: /setup (and sub-routes), /profile
 *   - Payment redirects: /payment/success, /payment/cancel
 *   - Public token-driven flows: /unsubscribe (HMAC token from email
 *     footer; recipient may not be the logged-in user, must work
 *     regardless of session state)
 *
 * Anything NOT on this list, when visited by an authenticated user
 * with incomplete onboarding, force-redirects to /setup.
 */
const EXEMPT_PATHS = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/confirm-email",
  "/plans",
  "/setup",
  "/profile",
  "/privacy-policy",
  "/terms",
  "/risk-disclosure",
  "/contact",
  "/performance",
  "/faq",
  "/unsubscribe",
  "/payment/success",
  "/payment/cancel",
];

function isExempt(path: string): boolean {
  // Exact match or starts with /setup (covers /setup/connect-exchange etc.)
  return (
    EXEMPT_PATHS.includes(path) ||
    path.startsWith("/setup/")
  );
}

/**
 * Global guard that redirects authenticated users to /setup if their
 * onboarding is not yet complete.
 *
 * <para>
 * On a fresh load of a protected page the auth bootstrap
 * (DashboardLayout's spinner) runs first, then this guard's onboarding
 * status check runs. We render a loader during BOTH so users never see
 * a flash of dashboard chrome before being redirected to /setup, and
 * never see a blank screen between the two checks. Exempt paths bypass
 * the guard entirely.
 * </para>
 */
export default function OnboardingGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const [checked, setChecked] = useState(false);
  const checkingRef = useRef(false);

  useEffect(() => {
    // Only check for authenticated users on non-exempt pages
    if (!isAuthenticated || isExempt(router.pathname)) {
      setChecked(true);
      return;
    }

    // Avoid duplicate calls
    if (checkingRef.current) return;
    checkingRef.current = true;

    let cancelled = false;

    async function check() {
      try {
        const { data } = await userApi.getOnboardingStatus();
        if (cancelled) return;

        if (data.isSuccess && data.data && !data.data.setupComplete) {
          const status = data.data;
          if (!status.hasActiveExchange) {
            router.replace("/setup");
          } else if (!status.hasActiveSubscription) {
            router.replace("/setup/choose-plan");
          } else {
            router.replace("/setup");
          }
          return;
        }
      } catch {
        // If the check fails, let the user through
      }

      if (!cancelled) {
        setChecked(true);
        checkingRef.current = false;
      }
    }

    check();

    return () => {
      cancelled = true;
      checkingRef.current = false;
    };
  }, [isAuthenticated, router.pathname, router]);

  // Exempt pages bypass the guard entirely (login, signup, public
  // pages, the setup flow itself). Unauthenticated users also fall
  // through — DashboardLayout's own auth gate handles bouncing them
  // to /login once hasCheckedAuth resolves.
  if (!isAuthenticated || isExempt(router.pathname)) {
    return <>{children}</>;
  }

  // Authenticated, non-exempt page, onboarding check still in flight:
  // show a centered spinner instead of returning null. Without this,
  // users see a blank frame between DashboardLayout's bootstrap
  // spinner and the dashboard rendering — jarring transition that
  // looks like a broken page. The check is fast (single GET) so this
  // typically renders for ~100-300ms.
  if (!checked) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SpinnerLarge />
      </div>
    );
  }

  return <>{children}</>;
}
