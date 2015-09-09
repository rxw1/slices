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

// get all posts
export function getAllPosts() {
  return function* () {
    return yield r.table('posts');
  }
}

// get all posts
export function deletePost(postID) {
  return function* () {
    return yield r.table('posts').getAll(postID).delete();
  }
}

router
  .get('/', function* () {
    this.body = yield getAllPosts();
  })
  .post('/', function* () {
    console.log(this.request.body);
    this.body = yield postData(this.request.body);
  })
  .delete('/', function* () {
    console.log(this.request.body);
    this.body = yield postData(this.request.body);
  })

const app = koa()
  .use(router.routes())
  .use(router.allowedMethods());

export default function () {
  return compose(app.middleware);
}
