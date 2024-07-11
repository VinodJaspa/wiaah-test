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
    config.resolve.fallback = {
      fs: false,
      tls: false,
      net: false,
      http2: false,
      dns: false,
      "stream/web": false,
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
