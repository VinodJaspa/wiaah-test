module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "esnext",
        },
      },
    ],
  },
};
