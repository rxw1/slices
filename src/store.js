/*
	Redux store configuration
	This is imported in server/render.js and client/app.js.

	Assemble store enhancers and middleware here. Return the one and only store
	that must be called once imported.

	Order is important!
	https://github.com/gaearon/redux-thunk/issues/9
	https://github.com/gaearon/redux-devtools/issues/68#issuecomment-131245239
*/

import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

let middleware = [];
let enhancers = [];

// Async
import thunk from 'redux-thunk';
middleware.push(thunk);

// Client only
if (global.hasOwnProperty('window')) {

	// Logger
	import createLogger from 'redux-logger';
	middleware.push(createLogger({
		level: 'info',
		collapsed: true
	}))

	// Devtools
	import { devTools, persistState } from 'redux-devtools';
	enhancers.push(devTools());
	enhancers.push(persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
  // persistState lets you write ?debug_session=<name> in address bar to
  // persist debug sessions
}

export default initialState => {
	const store = compose(
		applyMiddleware(...middleware),
		...enhancers,
	)(createStore)(reducers, initialState);

	if (module.hot) {
		module.hot.accept('./reducers', () => {
		  const nextRootReducer = require('./reducers');
		  store.replaceReducer(nextRootReducer);
		});
	}

	return store;
};
