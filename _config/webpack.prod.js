/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge')
const CommonConfig = require('./webpack.common.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(CommonConfig, {

  mode:'production',

  output: {
    filename: '[name]-[hash].bundle.js',
    chunkFilename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, '../assets'),
    publicPath: '/assets/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../_src/template/default.html'),
      filename: path.resolve(__dirname, '../_layouts/default.html')
    }),
    // new CleanWebpackPlugin(['_site/assets'], { root: path.resolve(__dirname, '../jekyll'), verbose: true }),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: false,
    // }),
    // new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
  ],
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    splitChunks: {
      chunks: 'async',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
