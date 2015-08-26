'use strict';

let _ = require('lodash');
let fs = require('co-fs');
let path = require('path');
let Promise = require('bluebird');

var FileQueue = require('filequeue');
var fq = new FileQueue(100);

const config = {
  db: 'slices',
  tables: ['slices']
};

// secondary indices
const sidx = {
  slices: ['otherSlice']
};

let r = require('rethinkdbdash')({db: config.db});

// function readDir() {
//   function *(next) {
//     yield fs.readdir(path.join(__dirname, 'slices'));
//   }
// }

// function handleFiles() {
//   return function*() {
//     fs.readdir(path.join(__dirname, 'slices'), function(err, files) {
//       return files.map(function(file) {
//         let json = fs.readFile(path.join(__dirname, 'slices', file), {encoding: 'utf8'});
//         return JSON.parse(json);
//       });
//     });
//   }
// }

function run() {
  return function* run() {
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

      console.log('reading files...');
      // let slices = yield handleFiles();
      // console.log('slices count', slices.length);

      let files = yield fs.readdir(path.join(__dirname, 'slices'));
      console.log('files count:', files.length);

      let lessFiles = files.slice(0, 8000); // FIXME

      let slices = yield lessFiles.map(function *(file) {
        let slice = yield fs.readFile(path.join(__dirname, 'slices', file), 'utf8');
        return JSON.parse(slice);
      })

      let result = yield r.table('slices').insert(slices);
      console.log('done');
      this.body = result;
      // this.status = 200;

    } catch(err) {
      throw (err);
    }
  };
}

function insertSlice(file) {
  return function* () {
    try {
      let slice = yield fs.readFile(path.join(__dirname, 'slices', file), 'utf8');
      let result = yield r.table('slices').insert(slice);
      console.log(result);
    } catch(err) {
      console.log(err.message);
    }
  }
}

module.exports = {
  run: run // create database and tables, populate w/ data
};
