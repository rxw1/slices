'use strict';

let _ = require('lodash');
let fs = require('co-fs');
let path = require('path');

const config = {
  db: 'slices',
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
      if (_.contains(yield r.dbList(), config.db)) {
        yield r.dbDrop(config.db);
        console.log(`dropped database: ${config.db}`);
      }

      // drop database if it already exists
      if (!_.contains(yield r.dbList(), config.db)) {
        yield r.dbCreate(config.db);
        console.log(`created database: ${config.db}`);
      }

      // get missing tables
      let missingTables = _.difference(config.tables,
        yield r.tableList());

      // create missing tables
      yield _.map(missingTables, function(table) {
        return r.tableCreate(table, {
          primaryKey: 'sliceID'
        });
        console.log(`created table: ${table}`);
      });

      // create secondary indices
      let secondaryIndices = [];
      _.each(sidx, function(values, key) {
        _.each(values).map(function(value) {
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
