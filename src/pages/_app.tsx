import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { clearAuth } from "@/store/authSlice";
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
