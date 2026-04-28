import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { clearAuth, fetchUser } from "@/store/authSlice";
import { clearSubscription } from "@/store/subscriptionSlice";
import { setOnAuthExpired } from "@/api/client";
import ThemeWrapper from "@/components/ThemeWrapper";
import PageLoader from "@/components/PageLoader";
import OnboardingGuard from "@/components/OnboardingGuard";

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
