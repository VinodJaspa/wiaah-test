import type { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import "ui/languages/i18n";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "ui/themes/chakra_ui/theme";
import { DataInitializationWrapper } from "ui";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactPubsubClient, ReactPubsubProvider } from "react-pubsub";
import { ReactSeoProvider } from "react-seo";
import NextHead from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <CookiesProvider>
            <ReactPubsubProvider client={new ReactPubsubClient()}>
              <ReactSeoProvider TagWrapper={NextHead}>
                <RecoilRoot>
                  <DataInitializationWrapper accountType="seller">
                    <Component {...pageProps} />
                  </DataInitializationWrapper>
                </RecoilRoot>
              </ReactSeoProvider>
            </ReactPubsubProvider>
          </CookiesProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
