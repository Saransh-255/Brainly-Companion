/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.prod.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  watch: true
});