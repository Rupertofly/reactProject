/* eslint-disable */

const webpack = require('webpack');
const path = require('path');
const mec = require('mini-css-extract-plugin');

/** @type {webpack.Configuration} */
const config = {
  entry: './src/client/index.ts',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'main.js',
    mode: process.env.NODE_ENV,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use:
          process.env.NODE_ENV !== 'production'
            ? ['style-loader', 'css-loader', 'sass-loader']
            : [mec.loader, 'style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
