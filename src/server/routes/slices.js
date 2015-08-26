import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import compose from 'koa-compose';
import _ from 'lodash';
import Router from 'koa-router';
let router = new Router();

import { getSlice, sampleSlices } from '../middleware/slices';
import insert from '../middleware/insert';

router

  // get a single slice
  .get('/api/slices/:sliceID/n', function* (next) {
    if (!this.params.sliceID) return;
    const sliceIDs = [parseInt(this.params.sliceID)];
    const slices = yield getSlice(sliceIDs);
    _.remove(slices, {sliceID: parseInt(this.params.sliceID)})
    this.body = slices;
  })

  // get all references only
  .get('/api/slices/:sliceID/refs', function* (next) {
    if (!this.params.sliceID) return;
    const sliceIDs = [parseInt(this.params.sliceID)];
    const slices = yield getSlice(sliceIDs);
    _.remove(slices, {sliceID: parseInt(this.params.sliceID)})
    this.body = slices;
  })

  // get a slice including all references
  .get('/api/slices/:sliceID', function* (next) {
    if (!this.params.sliceID) return;
    const sliceIDs = [parseInt(this.params.sliceID)];
    this.body = yield getSlice(sliceIDs);
  })

  // get a sample of n slices
  .get('/api/slices', function* () {
    this.body = yield sampleSlices();
  })

  .post('/api/slices', function* () {
    this.body = yield insert(this.request.body);
  })

  .get('/api/slices/f/:word', function* () {
    let response = yield fetch(`http://localhost:9200/slices/slices/_search?q=fragment:${this.params.word}&size=30`);
    const hits = response.body;
    this.body = hits;
  })

const app = koa()
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods());

export default function () {
  return compose(app.middleware);
}
