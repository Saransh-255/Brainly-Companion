/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const dest = path.join(__dirname, "dist");

module.exports = {
  entry: {
    homepage: path.join(__dirname, "src/views/homepage/index.ts"),
    question: path.join(__dirname, "src/views/question/index.tsx"),
    search: path.join(__dirname, "src/views/search/index.ts"),

    answerDash: ["core-js", path.join(__dirname, "src/views/answering/index.tsx")],

    theme: path.join(__dirname, "src/views/theme.ts"),
  },
  output: {
    path: dest + "/js",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: ["ts-loader"]
      },
      {
        exclude: /node_modules/,
        test: /\\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [
      new TsconfigPathsPlugin(),
    ],
    modules: ["node_modules"],
    fallback: {
      "fs": false
    },
  }
};