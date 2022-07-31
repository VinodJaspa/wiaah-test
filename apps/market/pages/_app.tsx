import type { AppProps } from "next/app";
import "../styles/globals.css";
import "ui/languages/i18n";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { CoomingSoon } from "../components/ComingSoon";
import theme from "ui/themes/chakra_ui/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { RoutingProvider } from "routing";
import { useRouter } from "next/router";
import React from "react";
const coomingSoon = false;

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(new QueryClient());
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <RoutingProvider visit={(url) => (router ? router.push(url) : null)}>
        <ChakraProvider theme={theme}>
          <CookiesProvider>
            <RecoilRoot>
              {coomingSoon ? <CoomingSoon /> : <Component {...pageProps} />}
            </RecoilRoot>
          </CookiesProvider>
        </ChakraProvider>
      </RoutingProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
