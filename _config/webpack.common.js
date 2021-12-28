/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname,"../_src/index.js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
