global.__CLIENT__ = true;
global.__SERVER__ = false;

import 'babel-core/polyfill';

// import 'material-design-lite/src/material-design-lite.scss';
// import 'material-design-lite/material.min.js';

import React from 'react';
import Root from '../shared/containers/Root';
import { history } from 'react-router/lib/BrowserHistory';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import routes from '../shared/routes';

import configureStore from '../shared/store/configureStore';
const store = configureStore(window.__initialState);

function renderRouter() {
  return (
	  <Router history={history}>
	    {routes}
	  </Router>
  );
}

React.render(
	<div>
		<Provider store={store}>
      {() => renderRouter()}
		</Provider>
	</div>,
  document.getElementById('root')
);
