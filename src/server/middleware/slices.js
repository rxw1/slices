import _ from 'lodash';
import rethinkdbdash from 'rethinkdbdash';
let r = rethinkdbdash({db: 'slices'});

export function getSlice(sliceIDs) {
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
      // .sortBy('sliceID')
      .uniq('sliceID')
      .value();
  }
}

export function getSlice(sliceIDs) {
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
      // .sortBy('sliceID')
      .uniq('sliceID')
      .value();
  }
}

export function sampleSlices(amount = 3) {
  return function* () {
    return yield r.table('slices').sample(amount);
  }
}

export function getAllSlices() {
  return function* () {
    return yield r.table('slices');
  }
}
