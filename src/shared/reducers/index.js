import { combineReducers } from 'redux';
import slices from './slices';
import languages from './languages';

const rootReducer = combineReducers({
  slices
  languages,
});

export default rootReducer;
