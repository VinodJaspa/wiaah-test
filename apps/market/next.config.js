const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr", "es", "de"],
    defaultLocale: "en",
  },
});
