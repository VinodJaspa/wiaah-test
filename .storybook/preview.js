import "../apps/market/styles/globals.css";
import * as NextImage from "next/image";
//import {i18n} from '../packages/ui/languages/i18n';
import { i18n } from "./i18next";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  i18n,
  locale: "fr",
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
