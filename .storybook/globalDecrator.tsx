import * as NextImage from "next/image";
import { i18n } from "./i18next";
// Removed addDecorator as it is deprecated
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { DataInitializationWrapper } from "ui";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { ReactPubsubClient, ReactPubsubProvider } from "react-pubsub";

import { AccountType } from "types";
// global decorator for app-wide wrappers
const globalDecorators = [
  (Story) => (
    <QueryClientProvider client={new QueryClient()}>
      <RecoilRoot>
        
        <CookiesProvider>
          <ReactPubsubProvider client={new ReactPubsubClient()} keys={{}}>
            <Suspense fallback={"Loading"}>
              <DataInitializationWrapper accountType={AccountType.Seller}>
                <section className="flex min-h-screen w-full items-center justify-center bg-white p-8">
                  <Story />
                </section>
              </DataInitializationWrapper>
            </Suspense>
          </ReactPubsubProvider>
        </CookiesProvider>
      </RecoilRoot>
    </QueryClientProvider>
  ),
];
export default globalDecorators;


