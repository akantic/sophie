const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".tsx"]
  },
  entry: {
    index: ["./src/index.tsx", "webpack/hot/only-dev-server"],
    debug: ["./src/debug/index.tsx", "webpack/hot/only-dev-server"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ["ts-loader", "eslint-loader"]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.html/,
        use: ["html-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]"
        }
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: "./dist",
    port: 3000,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["index"],
      template: path.resolve(__dirname, "public", "index.html")
    }),
    new HtmlWebpackPlugin({
      filename: "debug.html",
      chunks: ["debug"],
      template: path.resolve(__dirname, "public", "debug.html")
    })
  ]
};
