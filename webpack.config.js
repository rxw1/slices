'use strict';

var path = require('path');
var webpack = require('webpack');

var webpackPostcssTools = require('webpack-postcss-tools');
var map = webpackPostcssTools.makeVarMap('src/index.css');

var CompressionPlugin = require("compression-webpack-plugin");

const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT) + 1 || 3001;
const BASEURL = global.hasOwnProperty('window') ? '' : `http://${host}:${port}`;

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      `webpack-dev-server/client?${BASEURL}`,
      'webpack/hot/only-dev-server',
      './src/client'
    ],
    vendor: [
      'bluebird',
      'highlight.js',
      'humps',
      'isomorphic-fetch',
      'lodash',
      'methods',
      'react',
      'react-highlight',
      'react-redux',
      'react-router',
      'react-style',
      'redux',
      'redux',
      'redux-devtools',
      'redux-form',
      'redux-immutable',
      'redux-logger',
      'redux-thunk',
      'sass'
    ]
  },
  cssnext: {
    browsers: 'last 2 versions'
  },
  output: {
    path: path.join(__dirname, '/public/js/'),
    filename: 'app.js',
    publicPath: `${BASEURL}/js/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'common.js', Infinity),
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin({
        asset: "{file}.gz",
        algorithm: "gzip",
        regExp: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    })
  ],
  resolve: {
    extensions: ['', '.js'],
    packageMains: ['webpack', 'browser', 'web', 'style', 'main']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/
    },{
      test: /\.jsx$/,
      loader: 'jsx'
    },
    { test: /\.css$/, loader: 'style!css?importLoaders=1!postcss' },
    {
      test: /\.((png)|(eot)|(woff)|(ttf)|(svg)|(gif))$/,
      loader: 'file?name=/[hash].[ext]'
    }
    ]
  },
  postcss: [
    webpackPostcssTools.prependTildesToImports,

    require('postcss-custom-properties')({
      variables: map.vars
    }),

    require('postcss-custom-media')({
      extensions: map.media
    }),

    require('postcss-custom-selector')({
      extensions: map.selector
    }),

    require('postcss-calc')()
  ]
};
