import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import compose from 'koa-compose';
import _ from 'lodash';

import rethinkdbdash from 'rethinkdbdash';
let r = rethinkdbdash({db: 'slices'});

import Router from 'koa-router';
let router = new Router();

router
  .get('/slices', function* () {
    const slices = yield r.table('slices').sample(3);
    this.body = slices;
  })

const app = koa()
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods());

export default function () {
  return compose(app.middleware);
}
