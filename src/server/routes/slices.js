import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import compose from 'koa-compose';
import _ from 'lodash';
import Router from 'koa-router';
let router = new Router();

import { getSlices, sampleSlices } from '../middleware/slices';
import { tarSlices } from '../middleware/tar.gz';

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

  // get a tarball containing a slice and its references
  .get('/api/slices/:sliceID/tar', function* () {
    const sliceID = parseInt(this.params.sliceID);
    console.log(`preparing package for ${sliceID}...`);
    const sliceIDs = [sliceID];
    const slices = yield getSlices(sliceIDs);
    const archive = yield tarSlices(sliceID, slices);
    this.type = 'application/x-tar; charset=binary';
    this.set(`Content-disposition', 'attachment; filename=${sliceID}.json`)
    console.log(archive);
    this.body = slices;
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
