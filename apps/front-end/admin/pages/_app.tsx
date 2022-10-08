import type { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import "ui/languages/i18n";
import "react-quill/dist/quill.snow.css";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "ui/themes/chakra_ui/theme";
import { DataInitializationWrapper } from "ui";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactPubsubClient, ReactPubsubProvider } from "react-pubsub";
import { ReactSeoProvider } from "react-seo";
import NextHead from "next/head";
import { RoutingProvider } from "routing";
import { useRouter } from "next/router";
import { ClearNextJSQuery } from "utils";
import { AdminLayout } from "@components";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RoutingProvider
          getBaseUrl={() => router.basePath}
          getQuery={() => ClearNextJSQuery(router.query, router.route)}
          getCurrentPath={() => {
            return router.asPath;
          }}
          visit={(url) => (router ? router.push(url) : null)}
          getParam={(paramName) => {
            const params = router.query[paramName];
            const param =
              Array.isArray(params) && params.length > 0 ? params[0] : params;

            return typeof param === "string" ? param : null;
          }}
        >
          <ChakraProvider theme={theme}>
            <CookiesProvider>
              <ReactPubsubProvider client={new ReactPubsubClient()}>
                <ReactSeoProvider TagWrapper={NextHead}>
                  <RecoilRoot>
                    <DataInitializationWrapper accountType="seller">
                      <AdminLayout>
                        <Component {...pageProps} />
                      </AdminLayout>
                    </DataInitializationWrapper>
                  </RecoilRoot>
                </ReactSeoProvider>
              </ReactPubsubProvider>
            </CookiesProvider>
          </ChakraProvider>
        </RoutingProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
