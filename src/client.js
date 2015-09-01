global.__CLIENT__ = true;
global.__SERVER__ = false;

import 'babel-core/polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';

import { history } from 'react-router/lib/BrowserHistory';


// React components for Redux DevTools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import configureStore from './store';
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
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
	</div>,
  document.getElementById('root')
);
