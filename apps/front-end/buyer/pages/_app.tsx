import type { AppProps } from "next/app";
import React from "react";
import "../styles/globals.css";
import "ui/languages/i18n";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { DataInitializationWrapper } from "ui";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { AccountType } from "types";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>

          <CookiesProvider>
            <RecoilRoot>
              <DataInitializationWrapper accountType={AccountType.Buyer}>
                <Component {...pageProps} />
              </DataInitializationWrapper>
            </RecoilRoot>
          </CookiesProvider>

      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
