const path = require("path");
const webpack = require("webpack");
const HTMLwebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  entry: ["babel-polyfill", __dirname + "/dev/index.js"],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HTMLwebpackPlugin({
      template: "./dev/index.template.html",
      inject: true
    }),
     new webpack.optimize.ModuleConcatenationPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss"],
    alias: {
      Components: path.resolve(__dirname, "dev/components/"),
      Containers: path.resolve(__dirname, "dev/containers/"),
      Helpers: path.resolve(__dirname, "dev/helpers/"),
     }
  }
};

module.exports = config;
