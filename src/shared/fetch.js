import 'isomorphic-fetch';
import methods from 'methods';

const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT) + 1 || 3001;
const BASEURL = global.hasOwnProperty('window') ? '' : `http://${host}:${port}`;

methods.forEach(function(method) {
  exports[method] = function (path) {
    return fetch(`${BASEURL}${path}`, {method}).then(res => res.json());
  };
});
