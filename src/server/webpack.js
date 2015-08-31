'use strict';

import 'babel-core/polyfill';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../../webpack.config';

const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT) + 1 || 3001;
const BASEURL = global.hasOwnProperty('window') ? '' : `http://${host}:${port}`;

new WebpackDevServer(webpack(config), {
  // headers: {'Access-Control-Allow-Origin': '*'},
  publicPath: config.output.publicPath,
  contentBase: BASEURL,
  historyApiFallback: true,
  stats: { colors: true },
  hot: true,
  lazy: false,
  inline: true,
  noInfo: false,
  quiet: true
}).listen(port, host, function (err) {
  if (err) console.log(err);
  console.log(`WebpackDevServer at ${BASEURL}`);
});
