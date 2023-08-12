import "../apps/front-end/market/styles/globals.css";
import * as NextImage from "next/image";
//import {i18n} from '../packages/ui/languages/i18n';
import { i18n } from "./i18next";
import { addDecorator } from "@storybook/react";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { DataInitializationWrapper } from "ui";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { ReactPubsubClient, ReactPubsubProvider } from "react-pubsub";
import * as _jest from "jest-mock";

//@ts-ignore
// window["jest"] = _jest;

addDecorator((story) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RecoilRoot>
        <CookiesProvider>
          <ReactPubsubProvider client={new ReactPubsubClient()}>
            <Suspense fallback={"Loading"}>
              <DataInitializationWrapper accountType="seller">
                <section className="flex min-h-screen w-full items-center justify-center bg-white p-8">
                  {story()}
                </section>
              </DataInitializationWrapper>
            </Suspense>
          </ReactPubsubProvider>
        </CookiesProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
});

export const parameters = {
  i18n,
  locale: "en",
  locales: {
    en: "English",
    fr: "Français",
    es: "Española",
    de: "Deutsch",
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    "storybook/docs/panel": { index: -1 },
  },
};

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props: any) => <OriginalNextImage {...props} unoptimized />,
});
