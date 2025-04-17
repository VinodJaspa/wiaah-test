import type { Preview } from "@storybook/react";
import React from "react";
import { i18n } from "./i18next";
import globalDecorators from "./globalDecrator";
import "../apps/front-end/market/styles/globals.css";

import * as nextRouter from "next/router";


// Mock useRouter globally for Storybook
Object.defineProperty(nextRouter, "useRouter", {
  configurable: true,
  value: () => ({
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
    push: () => {},
    replace: () => {},
    reload: () => {},
    back: () => {},
    prefetch: () => Promise.resolve(),
    beforePopState: () => {},
    events: {
      on: () => {},
      off: () => {},
      emit: () => {},
    },
    isFallback: false,
    isReady: true,
    basePath: "",
  }),
});



const preview: Preview = {
  parameters: {
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
  },
  decorators: [...globalDecorators],
};


export default preview;
