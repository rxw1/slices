
import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import compose from 'koa-compose';

import 'isomorphic-fetch';

import rethinkdbdash from 'rethinkdbdash';
let r = rethinkdbdash({db: 'slices', silent: true});

import Router from 'koa-router';
let router = new Router({
  prefix: '/setup'
});

import database from '../middleware/database-setup.js';

export function elasticSearch () {
  return function* () {
    return yield fetch('http://localhost:9200/_river/rethinkdb/_meta', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "type": "rethinkdb",
        "rethinkdb": {
          "host": "localhost",
          "port": 28015,
          "databases": {
            "fragnix": {
              "slices": {
                "backfill": true
              }
            }
          }
        }
      })
    });
  }
}

router
  .get('/es', function* () {
    this.body = yield elasticSearch();
  })
  .get('/db', function* () {
    this.body = yield database();
  })

const app = koa()
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods());

export default function () {
  return compose(app.middleware);
}
