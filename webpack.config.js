const HtmlWebpackPlugin = require('html-webpack-plugin'),
  { resolve } = require('path'),
  { ProvidePlugin, HotModuleReplacementPlugin } = require('webpack'),
  { isDev } = require('./config/env.js'),
  merge = require('webpack-merge');

const baseConfig = {
  entry: './renderer/index.js',
  target: 'electron-renderer',
  // target: 'web',
  output: {
    path: resolve(__dirname, 'dist/web'),
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
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new ProvidePlugin({
      React: 'react',
      styled: 'styled-components'
    }),
    new HtmlWebpackPlugin({
      template: 'renderer/index.html',
      inject: true,
    }),
  ],
};

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/shrink': {
        target: 'https://api.tinify.com/shrink',
      }
    },
    // historyApiFallback: true,
  },
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
};

const prodConfig = {
  mode: 'production',
  plugins: [
  ]
};

module.exports = merge(baseConfig, isDev() ? devConfig : prodConfig);