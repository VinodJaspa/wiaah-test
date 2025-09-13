import type { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import "ui/languages/i18n";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthLayout, DataInitializationWrapper, ReactPubsubKeys } from "ui";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactPubsubClient, ReactPubsubProvider } from "react-pubsub";
import { ReactSeoProvider } from "react-seo";
import NextHead from "next/head";
import { RoutingProvider } from "routing";
import { NextRouter, useRouter } from "next/router";
import { ClearNextJSQuery } from "utils";
import { useGraphqlRequestErrorCode } from "api";
import { AccountType } from "types";



const handleAutoRedirect = (route: string, router: NextRouter) => {
  const currRoute = router.route;
  if (currRoute !== route && currRoute !== "/404") {
    router.push(`/${route}`);
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  const router = useRouter();

  useGraphqlRequestErrorCode(
    (v) => v.Unauthorized,
    () => {
      handleAutoRedirect("login", router);
    },
  );

  return (
    <QueryClientProvider client={queryClient}>

        <Hydrate state={pageProps.dehydratedState}>
          <RoutingProvider
            back={() => router.back()}
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
            <ToastContainer />
            <CookiesProvider>
              <AuthLayout>
                <ReactPubsubProvider
                  keys={ReactPubsubKeys}
                  client={new ReactPubsubClient()}
                >
                  <ReactSeoProvider TagWrapper={NextHead}>
                    <RecoilRoot>
                      <DataInitializationWrapper
                        accountType={AccountType.Seller}
                      >
                        <Component suppressHydrationWarning {...pageProps} />
                      </DataInitializationWrapper>
                    </RecoilRoot>
                  </ReactSeoProvider>
                </ReactPubsubProvider>
              </AuthLayout>
            </CookiesProvider>

          </RoutingProvider>
        </Hydrate>


    </QueryClientProvider>
  );
}

export default MyApp;


