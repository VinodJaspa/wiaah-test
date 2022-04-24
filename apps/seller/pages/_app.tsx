import type { AppProps } from "next/app";
import "../styles/globals.css";
import "ui/languages/i18n";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "ui/themes/chakra_ui/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <CookiesProvider>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </CookiesProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
