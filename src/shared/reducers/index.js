import { combineReducers } from 'redux';
import languages from './languages';
import { slices, references, selected } from './slices';

const rootReducer = combineReducers({
  languages,
  slices,
  references,
  selected
});

export default rootReducer;
