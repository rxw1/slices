'use strict';

import 'babel-core/polyfill';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config';

import chalk from 'chalk';

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
  const d = Date().split(' ');
  console.log(`${[d[2], d[1], d[4]].join(' ')} - ${chalk.magenta('[webpack]', BASEURL)}`);
});
