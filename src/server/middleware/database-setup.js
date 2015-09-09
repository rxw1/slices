import { contains, difference, map, each } from 'lodash';

const config = {
  db: 'fragnix',
  tables: ['slices']
};

// secondary indices
const sidx = {
  slices: ['otherSlice']
};

let r = require('rethinkdbdash')({db: config.db});

export default function () {
  return function* () {
    try {

      // drop database if it already exists
      if (contains(yield r.dbList(), config.db)) {
        yield r.dbDrop(config.db);
        console.log(`dropped database: ${config.db}`);
      }

      // drop database if it already exists
      if (!contains(yield r.dbList(), config.db)) {
        yield r.dbCreate(config.db);
        console.log(`created database: ${config.db}`);
      }

      // get missing tables
      let missingTables = difference(config.tables,
        yield r.tableList());

      // create missing tables
      yield map(missingTables, function(table) {
        return r.tableCreate(table, {
          primaryKey: 'sliceID'
        });
        console.log(`created table: ${table}`);
      });

      // create secondary indices
      let secondaryIndices = [];
      each(sidx, function(values, key) {
        each(values).map(function(value) {
          secondaryIndices.push(r.table(key).indexCreate(value));
          console.log(`created secondary index on ${key}: ${value}`);
          // secondaryIndices.push(r.table(key).indexWait(value));
        });
      });

      yield secondaryIndices;

      this.status = 200;

    } catch(err) {
      throw (err);
    }
  };
}
