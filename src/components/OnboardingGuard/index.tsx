import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { userApi } from "@/api/user";
import { SpinnerLarge } from "@/components/ui/Button";
import { isPublicPath } from "@/utils/publicPaths";

// Pages exempt from the "redirect to /setup if onboarding incomplete"
// check are: every public path (defined in utils/publicPaths.ts) +
// the bare /setup page + /profile.
//
//   - Public paths (homepage, /performance, /faq, /contact, /plans,
//     /terms, /privacy-policy, /risk-disclosure, /unsubscribe, all
//     auth-flow pages, payment-return URLs) come from the shared
//     utility — same list the API client checks before bouncing
//     unauthenticated visitors to /login. Sharing the list keeps the
//     two guards from drifting out of sync (the previous local
//     copies had drifted, missing /performance and /faq, which is
//     what surfaced the original bug).
//
//   - `/setup` (the bare path, no trailing slash) is the redirect
//     TARGET — it must be exempt to avoid a redirect loop. Sub-paths
//     under `/setup/` are matched by isPublicPath()'s prefix rule.
//
//   - `/profile` is exempt so users mid-onboarding can update their
//     account info (or sign out) without getting kicked back to
//     setup.
const ONBOARDING_EXEMPT_EXTRA: readonly string[] = ["/setup", "/profile"];

function isExempt(path: string): boolean {
  return isPublicPath(path) || ONBOARDING_EXEMPT_EXTRA.includes(path);
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
      // ── WAITLIST MODE ──────────────────────────────────────────
      // The plan picker + Binance connect screens are hidden, so
      // there's nowhere meaningful to redirect a user with
      // incomplete onboarding. Pass everyone through to their
      // requested route. Original gate kept below; revert the
      // comment to restore.
      if (!cancelled) {
        setChecked(true);
        checkingRef.current = false;
      }
      return;

      /*
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
      */
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
