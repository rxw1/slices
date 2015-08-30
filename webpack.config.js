'use strict';

var path = require('path');
var webpack = require('webpack');

const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT) + 1 || 3001;

var url = `http://${host}:${port}`;

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    `webpack-dev-server/client?${url}`,
    'webpack/hot/only-dev-server',
    './src/client/app'
  ],
  cssnext: {
    browsers: 'last 2 versions'
  },
  output: {
    path: path.join(__dirname, '/public/js/'),
    filename: 'app.js',
    publicPath: `${url}/js/`
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
