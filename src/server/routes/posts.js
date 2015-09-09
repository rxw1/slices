import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import compose from 'koa-compose';

import rethinkdbdash from 'rethinkdbdash';
let r = rethinkdbdash({db: 'test', silent: true});

import Router from 'koa-router';
let router = new Router({
  prefix: '/api/posts'
});

export function postData(data) {
  return function* () {
    return yield r.table('posts').insert(data, {
      returnChanges: true
    });
  }
}

router
  .post('/', function* () {
    console.log(this.request.body);
    this.body = yield postData(this.request.body);
  })

const app = koa()
  .use(router.routes())
  .use(router.allowedMethods());

export default function () {
  return compose(app.middleware);
}
