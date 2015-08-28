import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import compose from 'koa-compose';

import rethinkdbdash from 'rethinkdbdash';
let r = rethinkdbdash({db: 'slices'});

import Router from 'koa-router';
let router = new Router({
  prefix: '/api/languages'
});

// get all available languages (slow)

export function languages () {
  return function* () {
    return yield r.table("slices").concatMap(function(x) {
      return x('language');
    }).distinct();
  }
}

router
  .get('/', function* () {
    this.body = yield languages();
  })

const app = koa()
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods());

export default function () {
  return compose(app.middleware);
}
