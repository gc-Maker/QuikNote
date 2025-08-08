module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const cssRules = webpackConfig.module.rules.find((rule) =>
        Array.isArray(rule.oneOf)
      ).oneOf;

      cssRules.unshift({
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
          "less-loader",
        ],
      });

      return webpackConfig;
    },
  },
};
