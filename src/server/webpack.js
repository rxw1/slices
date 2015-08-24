'use strict';

import 'babel-core/polyfill';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../../webpack.config';

const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT) + 1 || 3001;

new WebpackDevServer(webpack(config), {
  noInfo: false,
  quiet: false,
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true },
  lazy: false,
  inline: true,
  // headers: {'Access-Control-Allow-Origin': '*'},
  contentBase: 'http://' + host + ':' + port
}).listen(port, host, function (err) {
  if (err) { console.log(err); }
  console.log('WebpackDevServer at %s:%s', host, port);
});
