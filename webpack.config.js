const { merge } = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

/** 공용 설정 */
const baseConfig = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              //타입체크는 ForkTsChecker에서 수행하도록 설정 할 예정
              transpileOnly: true,
              //병렬 처리 지원
              happyPackMode: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: "asset/resource",
        generator: { filename: "assets/images/[hash][ext][query]" },
      },
      {
        test: /\.(woff(2)?|ttf|otf|eot)$/,
        type: "asset/resource",
        generator: { filename: "assets/font/[hash][ext][query]" },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [
      new TsconfigPathsPlugin({
        extensions: [".ts", ".tsx", ".js"],
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: { semantic: true, syntactic: true },
      },
    }),
  ],
};

/** 실제 빌드 환경 */
const productionConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  optimization: {
    minimize: true,
  },
};

/** 개발용 설정
 * minimize 제거, 소스맵 활성화
 */
const developmentConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    host: "localhost",
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  devtool: "eval-cheap-module-source-map",
  cache: true,
};

module.exports = (_env, argv) => {
  if (argv.mode === "production") {
    return merge(baseConfig, productionConfig);
  }
  return merge(baseConfig, developmentConfig);
};
