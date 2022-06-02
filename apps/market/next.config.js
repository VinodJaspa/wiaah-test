const withTM = require("next-transpile-modules")([
  "ui",
  "api",
  "uris",
  "validation",
  "hooks",
  "utils",
  "state",
  "placeholder",
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
  })
);
