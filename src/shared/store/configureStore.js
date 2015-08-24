import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger
)(createStore);
// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools';

	devTools(),
	// Lets you write ?debug_session=<name> in address bar to persist debug sessions
	//persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
