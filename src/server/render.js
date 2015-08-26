import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import Location from 'react-router/lib/Location';
import routes from '../shared/routes';
import { fetchLanguages } from '../shared/actions/languages';
import { selectSlice, fetchSlice, fetchReferences } from '../shared/actions/slices';
import configureStore from '../shared/store/configureStore';

import nunjucks from 'nunjucks';
nunjucks.configure('src/shared', { autoescape: true });

export default function render() {
  return function* () {
    const location = new Location(this.request.path, this.request.query);
    const store = configureStore();

    yield store.dispatch(fetchLanguages());

    const sliceID = parseInt(this.request.path.split('/').find(x => x.match(/^[0-9]+$/)));

    if (sliceID) {
      console.log('getting initial slices due to url param');
      // yield store.dispatch(fetchSlice(sliceID));
      // yield store.dispatch(fetchReferences(sliceID));
      yield store.dispatch(selectSlice(sliceID));
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

        resolve(nunjucks.render('index.html', {
          appString,
          initialState: JSON.stringify(state),
          env: process.env
        }));
      });
    })
  }
}
