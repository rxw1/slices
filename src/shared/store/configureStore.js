import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';

// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools';

const logger = createLogger({
	level: 'info',
	collapsed: true,
	// predicate: (getState, action) => action.type !== AUTH_REMOVE_TOKEN
});
let middleware = [logger, thunk];

// middleware.push(logger);

const createStoreWithMiddleware = compose(
	applyMiddleware(...middleware),
	devTools(),
	// Lets you write ?debug_session=<name> in address bar to persist debug sessions
	//persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
	createStore
);

export default function configureStore(initialState) {
	console.log('initial state', initialState);
	return createStoreWithMiddleware(rootReducer, initialState);
}
