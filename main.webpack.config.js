const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
  resolve: {
    extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname), 'node_modules'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },

      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          { loader: 'less-loader', options: { javascriptEnabled: true } },
        ],
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

      {
        test: /\.(eot|gif|jpe?g|png|svg|ttf|woff|woff2)$/i,
        include: /[/\\](fonts|img)[/\\]/,
        loader: 'file-loader',
        options: {
          name() {
            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]';
            }

            return 'assets/[hash].[ext]';
          },
        },
      },

      {
        include: /[/\\]icons[/\\]/,
        loader: 'svg-react-loader',
        test: /\.svg$/,
      },
    ],
  },

  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/styles.[chunkhash].css',
    }),
    new webpack.WatchIgnorePlugin([path.resolve(__dirname, 'node_modules')]),
  ],
};
