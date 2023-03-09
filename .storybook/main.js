// .storybook/main.js
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const path = require("path");

const config = {
  stories: [
    // "../apps/**/*.stories.mdx",
    // "../apps/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/ui/**/*.stories.mdx",
    "../packages/ui/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  /** Expose public folder to storybook as static */
  staticDirs: [
    "../apps/front-end/market/public",
    "../apps/front-end/seller/public",
    "../apps/front-end/buyer/public",
  ],
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
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": [
          path.resolve(__dirname, "../apps/front-end/market/**"),
          path.resolve(__dirname, "../apps/front-end/seller/**"),
          path.resolve(__dirname, "../packages/**"),
        ],
        // "@partials": path.resolve(
        //   __dirname,
        //   "../packages/ui/components/partials"
        // ),
        // "@blocks": path.resolve(__dirname, "../package/ui/components/blocks"),
        // "@blocks/*": path.resolve(
        //   __dirname,
        //   "../packages/ui/components/blocks/*"
        // ),
        // "@sections/*": path.resolve(
        //   __dirname,
        //   "../packages/ui/components/sections/*"
        // ),
        // "@features/*": path.resolve(
        //   __dirname,
        //   "../packages/ui/components/features/*"
        // ),
        // "@sections": path.resolve(
        //   __dirname,
        //   "../packages/ui/components/sections"
        // ),
        // "@features": path.resolve(
        //   __dirname,
        //   "../packages/ui/components/features"
        // ),
        // "@libs": path.resolve(__dirname, "../packages/ui/libs"),
        // "@const": path.resolve(__dirname, "../packages/ui/constants"),
        // "@src/*": path.resolve(__dirname, "../packages/ui/src/*"),
        // "@UI": path.resolve(__dirname, "../packages/ui"),
        // "@UI/*": path.resolve["../packages/ui/*"],
      };
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          configFile: path.resolve(
            __dirname,
            "../apps/front-end/market/tsconfig.json"
          ),
        }),
      ];
    }

    /**
     * Fixes font import with /
     * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
     */
    if (config.resolve) {
      config.resolve.roots = [
        path.resolve(__dirname, "../public"),
        "node_modules",
      ];
    }

    return config;
  },
};

module.exports = config;
