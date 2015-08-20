'use strict';

let _ = require('lodash');
let fs = require('co-fs');
let path = require('path');

const config = {
  db: 'slices',
  tables: ['slices']
};

const sidx = {
  slices: ['sliceID', 'otherSlice'],
};

let r = require('rethinkdbdash')({db: config.db});

function init() {
  return function* init() {
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
        return r.tableCreate(table);
        console.log(`created table: ${table}`);
      });

      // create secondary indices
      let secondaryIndices = [];
      _.each(sidx, function(values, key) {
        _.each(values).map(function(value) {
          secondaryIndices.push(r.table(key).indexCreate(value));
          console.log(`created secondary index: ${key} ${value}`);
          // secondaryIndices.push(r.table(key).indexWait(value));
        });
      });

      yield secondaryIndices;

      let files = yield fs.readdir(path.join(__dirname, 'slices'));

      let slices = yield files.map(function *(file) {
        let slice = yield fs.readFile(path.join(__dirname, 'slices', file), 'utf8');
        return JSON.parse(slice);
      })

      let result = yield r.table('slices').insert(slices);

      this.body = result;

    } catch(err) {
      throw (err);
    }
  };
}

function* insertSlice(slice, next) {
  try {
    let result = yield r.table('slices').insert(slice);
  } catch(err) {
    console.log(err.message);
  }
}

module.exports = {
  init: init // create database and tables, populate w/ data
};
