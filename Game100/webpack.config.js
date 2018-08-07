const path = require("path");
const HTMLwebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const config = {
  entry: ["babel-polyfill", __dirname + "/dev/index.js"],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /(node_modules)/
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader?sourceMap!", "sass-loader?sourceMap!"]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "styles.css",
      disable: false,
      allChunks: true
    }),
       new HTMLwebpackPlugin({
      template: "./dev/index.template.html",
      inject: true
    })   
  ],
  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss"],
    alias: {
      Components: path.resolve(__dirname, "dev/components/"),
      Containers: path.resolve(__dirname, "dev/containers/"),
      Helpers: path.resolve(__dirname, "dev/helpers/"),
         }
  },

  devServer: {
    compress: false,
    contentBase: './dev',
    port: 9009
  }
};

module.exports = config;
