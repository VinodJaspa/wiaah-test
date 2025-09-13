import type { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import "ui/languages/i18n";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";

import { AuthLayout, DataInitializationWrapper, ReactPubsubKeys } from "ui";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactPubsubClient, ReactPubsubProvider } from "react-pubsub";
import { ReactSeoProvider } from "react-seo";
import Head from "next/head";
import { RoutingProvider } from "routing";
import { useRouter } from "next/router";
import { ClearNextJSQuery } from "utils";
import { AccountType } from "types";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();

  const NextHead: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <Head>{children}</Head>
  );

  // Client-side only logging
  React.useEffect(() => {
    if (!router || !router.events) return;

    const handleStart = (url: string) =>
      console.log("[Router] routeChangeStart:", url);
    const handleComplete = (url: string) =>
      console.log("[Router] routeChangeComplete:", url);
    const handleError = (err: any, url: string) =>
      console.error("[Router] routeChangeError:", url, err);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  }, [router]);
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
  
    // this code runs only in production
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("SW registered"))
      .catch(console.error);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RoutingProvider
          back={() => {
            console.log("[RoutingProvider.back] called");
            router.back();
          }}
          getBaseUrl={() => {
            console.log("[RoutingProvider.getBaseUrl]", router.basePath);
            return router.basePath;
          }}
          getQuery={() => {
            const cleared = ClearNextJSQuery(router.query, router.route);
            console.log("[RoutingProvider.getQuery]", cleared);
            return cleared;
          }}
          getCurrentPath={() => {
            console.log("[RoutingProvider.getCurrentPath]", router.asPath);
            return router.asPath;
          }}
          visit={async (url) => {
            console.log("[RoutingProvider.visit] navigating to:", url);
            if (!router) return false;
            try {
              await router.push(url);
              console.log("[RoutingProvider.visit] navigation finished:", url);
              return true;
            } catch (err) {
              console.error("[RoutingProvider.visit] failed:", err);
              return false;
            }
          }}
          getParam={(paramName) => {
            const params = router.query[paramName];
            const param =
              Array.isArray(params) && params.length > 0 ? params[0] : params;
            console.log("[RoutingProvider.getParam]", paramName, "=>", param);
            return typeof param === "string" ? param : null;
          }}
        >
          <CookiesProvider>
            <AuthLayout>
              <ReactPubsubProvider
                keys={ReactPubsubKeys}
                client={new ReactPubsubClient()}
              >
                <ReactSeoProvider TagWrapper={NextHead}>
                  <RecoilRoot>
                    <DataInitializationWrapper accountType={AccountType.Seller}>
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
