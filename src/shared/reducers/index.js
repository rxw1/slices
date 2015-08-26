import { combineReducers } from 'redux';
import languages from './languages';
import { slices, references, selected, searched } from './slices';

const rootReducer = combineReducers({
  languages,
  slices,
  references,
  selected,
  searched
});

export default rootReducer;
