import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { userApi } from "@/api/user";

/**
 * Pages that don't require onboarding completion.
 * Public pages, the setup flow itself, and auth pages are excluded.
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
 * Global guard that redirects authenticated users to /setup
 * if their onboarding is not yet complete.
 *
 * Renders children immediately — does NOT block rendering.
 * The redirect happens in the background once the check resolves.
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
          router.replace("/setup");
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

  // On exempt pages or after check passes, render children
  // On protected pages while checking, render nothing to avoid flash
  if (!isAuthenticated || isExempt(router.pathname)) {
    return <>{children}</>;
  }

  if (!checked) return null;

  return <>{children}</>;
}
