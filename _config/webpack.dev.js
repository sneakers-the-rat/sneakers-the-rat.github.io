/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge')
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const CommonConfig = require('./webpack.common.js');


module.exports = merge(CommonConfig, {
  mode: 'development',

  watch: true,
  watchOptions: {
    ignored: '**/node_modules/',
  },

  // Control how source maps are generated
  devtool: 'inline-source-map',

  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./assets'),
    publicPath: '/assets/',
    libraryTarget: 'var',
    library: 'WP'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../_src/template/default.html'),
      filename: path.resolve(__dirname, '../_layouts/default.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test:/\.(s[ac]ss)$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  }
});
