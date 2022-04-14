// .storybook/main.js
import type { StorybookConfig } from "@storybook/core-common";

const path = require("path");

const config: StorybookConfig = {
  stories: [
    "../apps/**/*.stories.mdx",
    "../apps/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/ui/**/*.stories.mdx",
    "../packages/ui/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  /** Expose public folder to storybook as static */
  staticDirs: ["../apps/market/public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chakra-ui/storybook-addon",
    "storybook-react-i18next",
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  core: {
    builder: "webpack5",
  },
  webpackFinal: (config) => {
    /**
     * Add support for alias-imports
     * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
     */
    config.resolve.alias = {
      ...config.resolve?.alias,
      "@": [
        path.resolve(__dirname, "../apps/market/pages/"),
        path.resolve(__dirname, "../apps/market/"),
        path.resolve(__dirname, "../packages/ui/components/*"),
        path.resolve(__dirname, "../packages/ui/components/blocks/*"),
      ],
    };

    /**
     * Fixes font import with /
     * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
     */
    config.resolve.roots = [
      path.resolve(__dirname, "../public"),
      "node_modules",
    ];

    return config;
  },
};

module.exports = config;
