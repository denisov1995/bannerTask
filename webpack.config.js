const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 4200,
  },
  entry: {
    main: path.resolve(__dirname, "./src/main.js"),
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].bundle.js",
    assetModuleFilename: "images/[name][ext][query]",
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack Boilerplate",
      template: path.resolve(__dirname, "./src/index.html"), 
      filename: "index.html", 
    }),
    new CleanWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /.html$/i,
        loader: "html-loader",
      },
      {
        test: /.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ],
  },
};