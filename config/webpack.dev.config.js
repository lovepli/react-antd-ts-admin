const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const webpack = require('webpack');


module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
    port: 8000,
    open: true,
    hot: true,
    overlay: true,
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'less-loader', {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.resolve(__dirname, '../src/styles/variable.less'),
            path.resolve(__dirname, '../src/styles/mixin.less')
          ]
        }
      }]
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        }
      }, {
          loader: 'sass-resources-loader',
          options: {
            resources: [
              path.resolve(__dirname, '../src/styles/variable.less'),
              path.resolve(__dirname, '../src/styles/mixin.less')
            ]
          }
        }]
    }]
  }
})
