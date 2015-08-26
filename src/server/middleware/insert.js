import _ from 'lodash';
import rethinkdbdash from 'rethinkdbdash';
const r = rethinkdbdash({db: 'slices'});

// insert a slice into the database

export default function insert (slice) {
  return function* (next) {
    const result = yield r.table('slices').insert(slice);
    if (result.errors) {
      if (result.hasOwnProperty('first_error')) {
        if (result.first_error.match(/^Duplicate primary key/)) {
          return {
            action: 'INSERT_SLICE',
            error: 'Duplicate primary key',
            sliceID: slice.sliceID
          }
        }
      }
    }

    return result;
  }
}
