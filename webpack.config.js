const HtmlWebpackPlugin = require('html-webpack-plugin'),
  { resolve } = require('path'),
  { ProvidePlugin } = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development',
  isProd = nodeEnv === 'production';

const baseConfig = {

};

const devConfig = {

};

const prodConfig = {

};

module.exports = {
  entry: './renderer/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[hash:5].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['css-loader', 'style-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'renderer/index.html',
      inject: true,
    }),
    new ProvidePlugin({
      React: 'react'
    })
  ]
};