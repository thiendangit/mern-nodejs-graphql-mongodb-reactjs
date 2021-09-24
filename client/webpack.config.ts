import path from "path";
import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options): Configuration => {
  const devMode = options.mode === 'development';
  process.env.NODE_ENV = options.mode;
  return {
    entry: "./src/index.tsx",
    ...(env.production || !env.development ? {} : {devtool: "eval-source-map"}),
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      plugins: [new TsconfigPathsPlugin()]
    },
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "build.js"
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            transpileOnly: true
          },
          exclude: /dist/
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
        {
          test: /.(sass|scss)$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
            'postcss-loader', // post process the compiled CSS
            'sass-loader', // compiles Sass to CSS, using Node Sass by default
          ]
        },
        {test: /\.(woff|woff2|ttf|eot)$/, loader: 'file-loader'},
        {test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader'},
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html"
      }),
      new webpack.DefinePlugin({
        "process.env.PRODUCTION": env.production || !env.development,
        "process.env.NAME": JSON.stringify(require("./package.json").name),
        "process.env.VERSION": JSON.stringify(require("./package.json").version)
      }),
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: "./src/**/*.{ts,tsx,js,jsx}" // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
        }
      }),
    ]
  }
};
