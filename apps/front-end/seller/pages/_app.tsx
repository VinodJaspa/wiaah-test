import type { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import "ui/languages/i18n";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { extendTheme } from "@chakra-ui/react";
import { AuthLayout, DataInitializationWrapper, ReactPubsubKeys } from "ui";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactPubsubClient, ReactPubsubProvider } from "react-pubsub";
import { ReactSeoProvider } from "react-seo";
import NextHead from "next/head";
import { RoutingProvider } from "routing";
import { NextRouter, useRouter } from "next/router";
import { ClearNextJSQuery } from "utils";
import { useGraphqlRequestErrorCode } from "api";

const handleAutoRedirect = (route: string, router: NextRouter) => {
  const currRoute = router.route;
  if (currRoute !== route && currRoute !== "/404") {
    // router.push(`/${route}`);
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  const router = useRouter();

  useGraphqlRequestErrorCode(
    (v) => v.unAuthorized,
    () => {
      handleAutoRedirect("login", router);
    }
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
          <CookiesProvider>
            <AuthLayout>
              <ReactPubsubProvider
                keys={ReactPubsubKeys}
                client={new ReactPubsubClient()}
              >
                <ReactSeoProvider TagWrapper={NextHead}>
                  <RecoilRoot>
                    <DataInitializationWrapper accountType="seller">
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

const theme = extendTheme({
  colors: {
    primary: {
      main: "#3AD398",
      hover: "#6bdeb3",
      light: "#ECFBF4",
      50: "#dffdf2",
      100: "#baf2dd",
      200: "#94e9c8",
      300: "#6bdeb3",
      400: "#43d59d",
      500: "#2abc83",
      600: "#1d9266",
      700: "#106848",
      800: "#02402b",
      900: "#00170c",
    },
    lightBlue: "#729FE5",
    secondaryRed: "#F67171",
    transparentBlue: "rgba(40,119,197,0.7)",
    lightGray: "#F6F6F6",
    darkerGray: "#E8E8E8",
  },
  shadows: {
    main: "0px 3px 15px -5px gray",
  },
  global: {
    ".thinScroll::-webkit-scrollbar": {
      width: "5px",
      borderRadius: "2rem",
    },

    /* Track */
    ".thinScroll::-webkit-scrollbar-track": {
      background: "#fff",
    },

    /* Handle */
    ".thinScroll::-webkit-scrollbar-thumb": {
      background: "#999999",
    },

    /* Handle on hover */
    ".thinScroll::-webkit-scrollbar-thumb:hover": {
      background: "#888",
    },
    ".noScroll::-webkit-scrollbar": {
      display: "none",
      width: "0px",
      height: "0px",
    },
  },
});
