const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');

const mainConfig = require('./main.webpack.config');

const prodConfig = {
  mode: 'production',

  entry: {
    bundle: './src/index.tsx',
    styles: './assets/less/global.less',
  },

  output: {
    filename: './js/[name].[hash].js',
    path: path.join(__dirname, 'build'),
    publicPath: './',
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(process.cwd(), 'build/**/*')],
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets/favicon',
        to: './assets/favicon',
      },
    ]),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: 'index.html',
      template: path.join(__dirname, 'assets/html/index.html'),
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          ecma: 6,
          output: {
            beautify: false,
            comments: false,
          },
        },
      }),
    ],
  },
};

const config = merge(mainConfig, prodConfig);
module.exports = config;
