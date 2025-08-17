const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // disable PWA in dev
  buildExcludes: [/middleware-manifest\.json$/],
  cacheId: "my-app-v1", // bump this on every breaking deployment
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "jsdelivr",
        expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: /^\/_next\/image\?url=.+$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "next-images",
        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    {
      urlPattern: /^\/_next\/.*/i,
      handler: "NetworkOnly",
    }, // ✅ fixed comma
    {
      urlPattern: /.*/i,
      handler: "NetworkFirst", // fallback for all routes
      options: {
        cacheName: "http-calls",
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

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

// ✅ Only one export
module.exports = withBundleAnalyzer(withPWA(withTM(nextConfig)));
