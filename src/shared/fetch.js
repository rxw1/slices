import 'isomorphic-fetch';
import methods from 'methods';

methods.forEach(function(method){
  exports[method] = function (path) {
    const url = __SERVER__ ? `http://localhost:3000${path}` : `http://92.51.147.239:3000${path}`;
    debugger
    console.log(`__SERVER__ ${__SERVER__} / ${method} ${url}`);
    return fetch(url, {method}).then(res => res.json());
  };
});
