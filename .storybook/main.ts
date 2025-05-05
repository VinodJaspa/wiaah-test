import type { StorybookConfig } from '@storybook/nextjs';
import path, { join, dirname } from 'path';
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  "stories": [
    // "../apps/**/*.stories.mdx",
    // "../apps/**/*.stories.@(js|jsx|ts|tsx)",
    "../packages/ui/**/*.mdx",
    "../packages/ui/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  /** Expose public folder to storybook as static */
  "staticDirs": [
    "../apps/front-end/market/public",
    "../apps/front-end/seller/public",
    "../apps/front-end/buyer/public",
    "../packages/ui/views/market/stories/assets"
  ],
  core: {
    builder: "webpack5",
  },

  "addons": [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath("@chromatic-com/storybook"),
    "@storybook/addon-docs",
    // Css overide
    getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
    ({
      name: getAbsolutePath("@storybook/addon-styling-webpack"),

      options: {
        rules: [{
          test: /\.css$/,
          sideEffects: true,
          use: [
            require.resolve("style-loader"),
            {
              loader: require.resolve("css-loader"),
              options: {

                importLoaders: 1,
              },
            }, {
              loader: require.resolve("postcss-loader"),
              options: {
                implementation: require.resolve("postcss"),
              },
            },
          ],
        },],
      }
    }),

  ],
  docs: {
    autodocs: "tag",
  },

  webpackFinal: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        zlib: false,
      },
    };
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": [
          path.resolve(__dirname, "../apps/front-end/market/**"),
          path.resolve(__dirname, "../apps/front-end/seller/**"),
          path.resolve(__dirname, "../packages/**"),
        ],

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

  }
};
export default config;
