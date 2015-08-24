import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import compose from 'koa-compose';
import _ from 'lodash';
import Router from 'koa-router';
let router = new Router();

import { getSlice, sampleSlices } from '../middleware/slices';

router

  // get a single slice including all references
  .get('/api/slices/:sliceID/n', function* (next) {
    if (!this.params.sliceID) return;
    const sliceIDs = [parseInt(this.params.sliceID)];
    const slices = yield getSlice(sliceIDs);
    _.remove(slices, {sliceID: parseInt(this.params.sliceID)})
    this.body = slices;
  })
  // get a single slice including all references
  .get('/api/slices/:sliceID/refs', function* (next) {
    if (!this.params.sliceID) return;
    const sliceIDs = [parseInt(this.params.sliceID)];
    const slices = yield getSlice(sliceIDs);
    _.remove(slices, {sliceID: parseInt(this.params.sliceID)})
    this.body = slices;
  })

  // get a single slice including all references
  .get('/api/slices/:sliceID', function* (next) {
    if (!this.params.sliceID) return;
    const sliceIDs = [parseInt(this.params.sliceID)];
    const slices = yield getSlice(sliceIDs);
    this.body = slices;
  })

  // get a sample of n slices
  .get('/api/slices', function* () {
    const slices = yield sampleSlices();
    this.body = yield sampleSlices();
  })

const app = koa()
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods());

export default function () {
  return compose(app.middleware);
}
