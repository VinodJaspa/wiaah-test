// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const path = require("path");
const nextConfig = {
  experimental: {
    esmExternals: false,
  },
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr", "es", "de"],
    defaultLocale: "en",
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };
    config.resolve.alias = {
      ...config.resolve.alias,
      "class-transformer": path.resolve(
        __dirname,
        "../../../node_modules/class-transformer"
      ),
    };
    config.module.rules.push({
      test: /\.ts(x?)$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      ],
      exclude: /node_modules/,
    });

    return config;
  },
};

const withTM = require("next-transpile-modules")([
  "ui",
  "api",
  "uris",
  "validation",
  "hooks",
  "utils",
  "state",
  "placeholder",
  "types",
  "routing",
  "react-seo",
  "react-pubsub",
  "lib",
]);
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withTM(withPWA(nextConfig));
