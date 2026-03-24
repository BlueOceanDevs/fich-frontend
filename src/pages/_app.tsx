import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store";
import ThemeWrapper from "@/components/ThemeWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </Provider>
  );
}
