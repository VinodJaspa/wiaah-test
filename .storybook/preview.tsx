import "../apps/market/styles/globals.css";
import * as NextImage from "next/image";
//import {i18n} from '../packages/ui/languages/i18n';
import { i18n } from "./i18next";
import { addDecorator } from "@storybook/react";
import { CookiesProvider } from "react-cookie";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "ui/themes/chakra_ui/theme";
import { Root } from "ui";

addDecorator((story) => (
  <ChakraProvider theme={theme}>
    <CookiesProvider>
      <RecoilRoot>
        <section className="flex min-h-screen w-full items-center justify-center bg-slate-200 p-8">
          {story()}
        </section>
      </RecoilRoot>
    </CookiesProvider>
  </ChakraProvider>
));

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
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
