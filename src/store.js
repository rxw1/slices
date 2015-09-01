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
import thunk from 'redux-thunk';

let clientMiddleware = [];
let clientEnhancers = [];

// Client only
if (global.hasOwnProperty('window')) {

	// Logger
	import createLogger from 'redux-logger';
	clientMiddleware.push(createLogger({
		level: 'info',
		collapsed: true
	}))

	// Devtools
	import { devTools, persistState } from 'redux-devtools';
	clientEnhancers.push(devTools());
	clientEnhancers.push(persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
  // persistState lets you write ?debug_session=<name> in address bar to
  // persist debug sessions
}

export default initialState => {
	const store = compose(
		applyMiddleware(thunk, ...clientMiddleware),
		...clientEnhancers,
	)(createStore)(reducers, initialState);

	if (module.hot) {
		module.hot.accept('./reducers', () => {
		  const nextRootReducer = require('./reducers');
		  store.replaceReducer(nextRootReducer);
		});
	}

	return store;
};
