'use strict';

require('babel/polyfill');

let rethinkdbdash = require('rethinkdbdash');
let r = rethinkdbdash({db: 'bidos'});
let fs = require('co-fs-extra');
let _ = require('lodash');
let jsonfile = require('jsonfile');

fs.readFile('./seeds.json', 'utf-8');

const PREFIX = 'backup';

r.table('domains').then(function(domains) {
  _.each(domains, function(domain) {
    fs.mkdirp([PREFIX, domain.id].join('/'));
    r.table('subdomains').filter({domain_id: domain.id}).then(function(subdomains) {
      _.each(subdomains, function(subdomain) {
        fs.mkdirp([PREFIX, domain.id, subdomain.id].join('/'));
        r.table('items').filter({subdomain_id: subdomain.id}).then(function(items) {
          _.each(items, function(item) {
            console.log(`${domain.text} ${subdomain.text} ${item.text}.json`);
            jsonfile.writeFile(`./${PREFIX}/${domain.id}/${subdomain.id}/${item.id}.json`, item, {spaces: 2}, function (err) {
              if (err) console.error(err);
            });
          });
        });
      });
    });
  });
});
