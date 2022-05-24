const withTM = require("next-transpile-modules")(["ui", "api", "uris"]);
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
    experimental: {
      esmExternals: false,
    },
  })
);
