import _ from 'lodash';
import rethinkdbdash from 'rethinkdbdash';
let r = rethinkdbdash({db: 'slices'});

import { tarSlices } from './tar.gz';

// get a slice and all its references, recursively
export function getSlices(sliceIDs) {
  return function* (next) {
    let slices = yield r.table('slices')
      .getAll(...sliceIDs, {index: "sliceID"});

    let allSlices = [...slices];

    let otherSliceIDs = _.chain(slices)
      .pluck('uses')
      .flatten()
      .pluck('reference.otherSlice')
      .filter()
      .value();

    if (otherSliceIDs.length) {
      let otherSlices = yield getSlice(otherSliceIDs);
      allSlices.push(...otherSlices);
    }

    return _.chain(allSlices)
      .uniq('sliceID')
      .value();
  }
}

// get n random slices
export function sampleSlices(amount = 3) {
  return function* () {
    return yield r.table('slices').sample(amount);
  }
}

// get all available slices
export function getAllSlices() {
  return function* () {
    return yield r.table('slices');
  }
}
