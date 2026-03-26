import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import ThemeWrapper from "@/components/ThemeWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeWrapper>
          <Component {...pageProps} />
        </ThemeWrapper>
      </PersistGate>
    </Provider>
  );
}
