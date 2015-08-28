import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import compose from 'koa-compose';

import _ from 'lodash';

import rethinkdbdash from 'rethinkdbdash';
let r = rethinkdbdash({db: 'slices'});

import Router from 'koa-router';
let router = new Router({
  prefix: '/api/slices'
});

import 'isomorphic-fetch';

// get a sample of n slices w/o references
export function sampleSlices (amount = 3) {
  return function* () {
    return yield r.table('slices').sample(parseInt(amount));
  }
}

// get slices and references
export function getSlices (sliceIDs, slices = []) {
  return function* () {
    if (typeof sliceIDs === 'string') {
      sliceIDs = sliceIDs.split(',').map(Number);
    }

    const result = yield r.table('slices').getAll(...sliceIDs)

    slices.push(...result);

    let refIDs = _.chain(result)
      .pluck('uses')
      .flatten()
      .pluck('reference.otherSlice')
      .filter() // TODO filter known slices here?
      .difference(slices.map(slice => slice.sliceID)) // doesnt work, does it?
      .value();

    if (refIDs.length) {
      yield getSlices(refIDs, slices);
    }

    // TODO What is more efficient? Just collecting all references recursively
    // and remvoving duplicates before returning them? Or should we do a check
    // on every sliceID and never fetch anything we already have? Afaict there
    // are rarely more than 1-2 duplicates per run.

    return _.uniq(slices, 'sliceID');
  }
}

// insert slice into database
export function insertSlice (slice) {
  return function* () {
    console.log(slice);
    const exists = yield r.table('slices').getAll(slice.sliceID).count()
    if (!exists) {
      return result = yield r.table('slices').insert(slice);
    } else {
      return { error: `sliceID ${slice.sliceID} exists`};
    }
  }
}

// get all slices
export function getAllSlices () {
  return function* () {
    return yield r.table('slices');
  }
}

// elasticsearch
export function searchSlices () {
  return function* () {
    const { word } = this.params;
    const size = this.query.size ? `&size=${this.query.size}` : '';
    const path = `http://localhost:9200/slices/slices/_search?q=fragment:${word}${size}`;
    const response = yield fetch(path);
    return response.body;
  }
}

// get references only
export function getReferences (sliceIDs) {
  return function* () {
    let slices = yield getSlices(this.params.sliceIDs)
    // TODO avoid getting duplicates
    _.remove(slices, {sliceID: parseInt(this.params.sliceID)});
    return slices;
  }
}

router
  .get('/', function* () {
    this.body = yield getAllSlices();
  })
  .get('/search/:word', function* () {
    this.body = yield searchSlices(this.params.word);
  })
  .get('/sample/:amount?', function* () {
    this.body = yield sampleSlices(this.params.amount);
  })
  .get('/:sliceIDs(\\d+)+/refs', function* () {
    this.body = yield getReferences(this.params.sliceIDs);
  })
  .get('/:sliceIDs(\\d+)?', function* () {
    this.body = yield getSlices(this.params.sliceIDs);
  })
  .post('/', function* () {
    this.body = yield insertSlice(this.request.body);
  });

const app = koa()
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods());

export default function middleware () {
  return compose(app.middleware);
}
