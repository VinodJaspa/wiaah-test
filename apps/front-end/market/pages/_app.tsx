import type { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import "ui/languages/i18n";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactPubsubKeys } from "ui";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactPubsubClient, ReactPubsubProvider } from "react-pubsub";
import { ReactSeoProvider } from "react-seo";
import NextHead from "next/head";
import { RoutingProvider } from "routing";
import { useRouter } from "next/router";
import { ClearNextJSQuery } from "utils";
import { CoomingSoon, SeoWrapper } from "@components";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

const coomingSoon = false;

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  const client = new ApolloClient({
    uri: "http://localhost:3004/graphql",
    cache: new InMemoryCache(),
  });

  const router = useRouter();

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RoutingProvider
            back={() => router.back()}
            getBaseUrl={() => router.basePath}
            getQuery={() => ClearNextJSQuery(router.query, router.pathname)}
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
            <ReactPubsubProvider
              keys={ReactPubsubKeys}
              client={new ReactPubsubClient()}
            >
              <ReactSeoProvider TagWrapper={NextHead}>
                <SeoWrapper>
                  <ChakraProvider>
                    <CookiesProvider>
                      <RecoilRoot>
                        {coomingSoon ? (
                          <CoomingSoon />
                        ) : (
                          <Component {...pageProps} />
                        )}
                      </RecoilRoot>
                    </CookiesProvider>
                  </ChakraProvider>
                </SeoWrapper>
              </ReactSeoProvider>
            </ReactPubsubProvider>
          </RoutingProvider>
        </Hydrate>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
