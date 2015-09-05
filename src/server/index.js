global.__CLIENT__ = false;
global.__SERVER__ = true;

import 'babel-core/polyfill';

import koa from 'koa';
const app = koa();
export default app;

import compress from 'koa-compress';
app.use(compress());

import serve from 'koa-static';
app.use(serve('public'));

import cors from 'koa-cors';
app.use(cors({
  headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']
}));

import logger from 'koa-logger';
if (require.main === module) {
  app.use(logger());
}

import helmet from 'koa-helmet';
app.use(helmet());

import favicon from 'koa-favicon';
app.use(favicon());

import bodyparser from 'koa-bodyparser';
app.use(bodyparser());

import api from './api';
app.use(api());

import render from './render';
app.use(render());

app.listen(3000);

import chalk from 'chalk';
const d = Date().split(' ');
const port = parseInt(process.env.PORT) + 1 || 3001;
console.log(`${[d[2], d[1], d[4]].join(' ')} - ${chalk.red('[koa]', 'http://localhost:' + port)}`);
