'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './src/client/app'
  ],
  cssnext: {
    browsers: 'last 2 versions'
  },
  output: {
    path: path.join(__dirname, '/public/js/'),
    filename: 'app.min.js',
    publicPath: 'http://localhost:3001/js/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      // include: __dirname
    },{
      test: /\.jsx$/,
      loader: 'jsx'
    },
    {
      test: /\.css$/,
      loader: 'style!css'
    },
    {
      test: /\.less$/,
      loader: 'style!css!less'
    },
    {
      test: /\.scss$/,
      // loader: 'style!css!sass'
      // loader: 'style-loader!css-loader!cssnext-loader'
      loader: 'style!css!sass'
    }]
  }
};
