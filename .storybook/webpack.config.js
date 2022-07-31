const path = require('path')

module.exports = {
  target: "web",
  mode: "production",
  module: {
    rules: [{
        test: /\.md$/,
        use: [{
          loader: "markdown-loader"
        }]
      },
      {
        test: /\.[jt]sx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@kadira/storybook-addons": "@storybook/addons"
    }
  }
};
