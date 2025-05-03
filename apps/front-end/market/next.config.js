
const path = require("path");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const WebpackBar = require('webpackbar');
const withTM = require("next-transpile-modules")(
  [
    path.resolve(__dirname, "../../../packages/api"),
    path.resolve(__dirname, "../../../packages/hooks"),
    path.resolve(__dirname, "../../../packages/placeholder"),
    path.resolve(__dirname, "../../../packages/ReactPubsub"),
    path.resolve(__dirname, "../../../packages/ReactSeo"),
    path.resolve(__dirname, "../../../packages/state"),
    //Deadly needed to transpile beacuse of reserved word usage
    path.resolve(__dirname, "../../../packages/Dto"),
    path.resolve(__dirname, "../../../packages/types"),
    path.resolve(__dirname, "../../../packages/ui"),
    path.resolve(__dirname, "../../../packages/utils"),
    path.resolve(__dirname, "../../../packages/routing"),
    path.resolve(__dirname, "../../../packages/uris"),
    path.resolve(__dirname, "../../../packages/lib"),
    path.resolve(__dirname, "../../../packages/validation"),

  ],
  { symlink: false },

);
console.log("Transpiling packages:");
module.exports =withBundleAnalyzer(
  withTM({
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    esmExternals: "loose",
  },
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    config.stats = 'verbose';
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
      }
    });
      config.plugins.push(
        new WebpackBar({
          name: 'Building…',
          color: 'green',
          reporters: ['fancy'],
        })
      );
    return config;
  },
  
})
);