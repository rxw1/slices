import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';
import { select } from '../actions/slices';
import configureStore from '../store';
import Location from 'react-router/lib/Location';

export default function render() {
  return function* () {
    const location = new Location(this.request.path, this.request.query);
    const store = configureStore();

    const sliceID = parseInt(this.request.path.split('/').find(x => x.match(/^[0-9]+$/)));

    if (sliceID) {
      console.log(`>>> getting initial state for ${sliceID} due to url param`);
      yield store.dispatch(select(sliceID));
    }

    this.body = yield new Promise(resolve => {
      Router.run(routes, location, (error, initialRouterState, transition) => {
        if (!initialRouterState) {
          return;
        }

        function renderRouter() {
          return (
            <Router {...initialRouterState}>
              {routes}
            </Router>
          );
        }

        const appString = React.renderToString(
          <div>
            <Provider store={store}>
              {() => renderRouter()}
            </Provider>
          </div>
        );

        var state = store.getState();

        const host = process.env.HOST || 'localhost';
        const port = parseInt(process.env.PORT) + 1 || 3001;
        const BASEURL = global.hasOwnProperty('window') ? '' : `http://${host}:${port}`;

        // var getPath = f =>
        //   `${BASEURL}/js/${process.env.NODE_ENV === 'development' ? `${f}.js` : `${f}.min.js`}`

        function getPath(f) {
          return `${BASEURL}/js/${process.env.NODE_ENV === 'development' ? `${f}.js` : `${f}.min.js`}`
        }

        resolve(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta http-equiv="x-ua-compatible" content="ie=edge">
              <title>Slices</title>
              <meta name="description" content="">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
              <link rel="stylesheet" href='//cdn.jsdelivr.net/font-hack/2.010/css/hack.min.css' type='text/css'>
              <link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.4/material.brown-pink.min.css">
              <link rel="stylesheet" href="/styles/tomorrow.css">
              <script src="https://storage.googleapis.com/code.getmdl.io/1.0.4/material.min.js"></script>
            </head>
            <body>
              <div id="root">${appString}</div>
              <script>window.__initialState = ${JSON.stringify(state)}</script>
              <script src="${getPath('common')}" defer></script>
              <script src="${getPath('app')}" defer></script>
            </body>
          </html>
        `);
      });
    })
  }
}
