import type { AppProps } from "next/app";
import "../styles/globals.css";
import "ui/languages/i18n";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { CoomingSoon } from "../components/ComingSoon";
import theme from "ui/themes/chakra_ui/theme";
import { QueryClient, QueryClientProvider } from "react-query";

const coomingSoon = false;
const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <CookiesProvider>
          <RecoilRoot>
            {coomingSoon ? <CoomingSoon /> : <Component {...pageProps} />}
          </RecoilRoot>
        </CookiesProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
