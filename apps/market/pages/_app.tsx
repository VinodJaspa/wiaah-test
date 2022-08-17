import type { AppProps } from "next/app";
import "../styles/globals.css";
import "ui/languages/i18n";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { CoomingSoon } from "@components";
import theme from "ui/themes/chakra_ui/theme";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { RoutingProvider } from "routing";
import { useRouter } from "next/router";
import React from "react";
import { ReactPubsubClient, ReactPubsubProvider } from "react-pubsub";
const coomingSoon = false;

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(new QueryClient());
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedProps}>
        <RoutingProvider
          getCurrentPath={() => router.asPath}
          visit={(url) => (router ? router.push(url) : null)}
          getParam={(paramName) => {
            const params = router.query[paramName];
            const param =
              Array.isArray(params) && params.length > 0 ? params[0] : params;
            return typeof param === "string" ? param : null;
          }}
        >
          <ReactPubsubProvider client={new ReactPubsubClient()}>
            <ChakraProvider theme={theme}>
              <CookiesProvider>
                <RecoilRoot>
                  {coomingSoon ? <CoomingSoon /> : <Component {...pageProps} />}
                </RecoilRoot>
              </CookiesProvider>
            </ChakraProvider>
          </ReactPubsubProvider>
        </RoutingProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
