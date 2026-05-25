import { useEffect } from "react";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { clearAuth, fetchUser } from "@/store/authSlice";
import { clearSubscription } from "@/store/subscriptionSlice";
import { setOnAuthExpired } from "@/api/client";
import ThemeWrapper from "@/components/ThemeWrapper";
import PageLoader from "@/components/PageLoader";
import OnboardingGuard from "@/components/OnboardingGuard";

// Google Analytics 4 measurement ID. Hardcoded because it's a
// public-by-design tracking identifier (anyone who views source
// can see it) and we only have one GA property for the production
// site. If we ever want a separate property for staging/preview,
// promote this to NEXT_PUBLIC_GA_MEASUREMENT_ID and bake it in at
// build time via the Dockerfile build-arg.
const GA_MEASUREMENT_ID = "G-BSCJEH4969";

function AppInner({ Component, pageProps }: AppProps) {
  // Wire up the auth-expired callback once on mount
  useEffect(() => {
    setOnAuthExpired(() => {
      store.dispatch(clearAuth());
      store.dispatch(clearSubscription());
    });
  }, []);

  // Bootstrap auth on every page load. We always fire fetchUser() once,
  // independent of any cached `isAuthenticated` flag — the auth slice is
  // no longer persisted, so the only reliable signal that the user is
  // logged in is "the cookies still work, the API returns the profile."
  //
  // For anonymous visitors this costs one round-trip that returns 401
  // and resolves quickly; the response interceptor's refresh attempt
  // also fails fast, and `hasCheckedAuth` flips to true so protected
  // pages can stop showing a loader. For returning logged-in users the
  // cookies refresh transparently and they land on their dashboard
  // without ever seeing a logged-out flash.
  useEffect(() => {
    store.dispatch(fetchUser());
  }, []);

  return (
    <ThemeWrapper>
      {/* Google Analytics — loaded once at the app level with
          `afterInteractive` so it doesn't block hydration. The two
          tags mirror the standard GA4 snippet: an async loader for
          gtag.js, then an inline init that calls gtag('config', ...)
          which fires the initial page_view. Client-side route
          changes are not auto-tracked by GA4 in a Next.js SPA — if
          we ever want per-route page_view events, add a useEffect
          on router.events.routeChangeComplete that calls
          gtag('event', 'page_view', { page_path }). Out of scope
          for the initial install. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <PageLoader />
      <OnboardingGuard>
        <Component {...pageProps} />
      </OnboardingGuard>
    </ThemeWrapper>
  );
}

export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppInner {...props} />
      </PersistGate>
    </Provider>
  );
}
