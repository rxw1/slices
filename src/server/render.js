import React             from 'react';
import { Provider }      from 'react-redux';
import { Router, Route } from 'react-router';
import Location          from 'react-router/lib/Location';
import routes            from '../shared/routes';
import { fetchSlices }   from '../shared/actions';
import configureStore    from '../shared/store/configureStore';
import Root              from '../shared/containers/Root';

import nunjucks from 'nunjucks';
nunjucks.configure('src/shared', { autoescape: true });

export default function render() {
  return function* () {
    const location = new Location(this.request.path, this.request.query);
    const store = configureStore();
    yield store.dispatch(fetchSlices()); // goes to script tag for hydration

    this.body = yield new Promise(resolve => {
      Router.run(routes, location, (error, initialRouterState, transition) => {

        if (!initialRouterState) {
          return;
        }

        var state = store.getState();

        const appString = React.renderToString(
          <Root initialRouterState={initialRouterState} />
        );

        resolve(nunjucks.render('index.html', {
          appString,
          initialState: JSON.stringify(state),
          env: process.env
        }));

      });
    })

  }
}
