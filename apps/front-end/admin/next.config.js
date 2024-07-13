const { patchWebpackConfig } = require("next-global-css");
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    esmExternals: false,
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
const withPWA = require("next-pwa");

module.exports = withTM(
  withPWA({
    reactStrictMode: true,
    i18n: {
      locales: ["en", "fr", "es", "de"],
      defaultLocale: "en",
    },
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
    },
    ...nextConfig,
  })
);
