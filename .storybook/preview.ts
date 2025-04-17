// Replace your-framework with the framework you are using (e.g., react, vue3)
import type { Preview } from "@storybook/react";
import { i18n } from "./i18next";
import globalDecorators from "./globalDecrator";



import '../apps/front-end/market/styles/globals.css';



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
    decorators: globalDecorators
  };




export default preview;