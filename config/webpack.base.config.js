const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = (dir) => {
  return path.resolve(process.cwd(), dir)
}

module.exports = {
  entry: {
    main: resolve('src/index.tsx'),
    vendors: ['axios', 'react']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      filename: 'index.html',
      favicon: "public/favicon.ico",
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true,
      }
    }),
    new webpack.ProvidePlugin({
      $http: [resolve('src/utils/http.ts'), 'default'],
      $msg: [resolve('node_modules/antd/es/message/index.js'), 'default']
    })
  ],
  module: {
    rules: [{
      test: /\.jpg|png|gif|jpeg|bmp|svg$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000,
          publicPath: '../',
          name: 'img/[name]-[hash:6].[ext]'
        }
      },
      exclude: resolve('src/assets/icons')
    }, {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
      include: resolve('src/assets/icons')
    }, {
      test: /\.ttf|eot|woff|woff2$/,
      use: 'url-loader',
    }, {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.tsx?$/,
      loaders: ['babel-loader', 'ts-loader']
    }]
  },
  resolve: {
    alias: {
      '@': resolve('src')
    },
    extensions: ['.ts', '.tsx', '.js', ".json"]
  }
}
