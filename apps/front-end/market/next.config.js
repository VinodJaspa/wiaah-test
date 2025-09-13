const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const isDev = process.env.NODE_ENV === "development";
// const withPWA = require("next-pwa")({
//   dest: "public",
//       register: true,
//       skipWaiting: true,
//       disable: isDev, // fully disable SW in dev
// });
const WebpackBar = require("webpackbar");
const withTM = require("next-transpile-modules")(
  [
    path.resolve(__dirname, "../../../packages/api"),
    path.resolve(__dirname, "../../../packages/hooks"),
    path.resolve(__dirname, "../../../packages/placeholder"),
    path.resolve(__dirname, "../../../packages/ReactPubsub"),
    path.resolve(__dirname, "../../../packages/ReactSeo"),
    path.resolve(__dirname, "../../../packages/state"),
    path.resolve(__dirname, "../../../packages/Dto"),
    path.resolve(__dirname, "../../../packages/types"),
    path.resolve(__dirname, "../../../packages/ui"),
    path.resolve(__dirname, "../../../packages/utils"),
    path.resolve(__dirname, "../../../packages/routing"),
    path.resolve(__dirname, "../../../packages/uris"),
    path.resolve(__dirname, "../../../packages/lib"),
    path.resolve(__dirname, "../../../packages/validation"),
  ],
  { symlink: false }
);

// Compose plugins: withTM → withPWA → withBundleAnalyzer
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr", "es", "de"],
    defaultLocale: "en",
  },
  experimental: {
    esmExternals: "loose",
  },
  productionBrowserSourceMaps: false,
  images: {
    domains: ["picsum.photos"],
  },
  webpack: (config) => {
    config.stats = "verbose";

    config.optimization.splitChunks = {
      chunks: "all",
    };

    config.module.rules.push({
      test: /\.tsx?$/,
      loader: "esbuild-loader",
      exclude: /node_modules/,
      options: {
        loader: "tsx",
        target: "esnext",
      },
    });

    config.plugins.push(
      new WebpackBar({
        name: "Building…",
        color: "green",
        reporters: ["fancy"],
      })
    );

    return config;
  },
};

module.exports = withBundleAnalyzer((withTM(nextConfig)));