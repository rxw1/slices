import { combineReducers } from 'redux';

import * as slices from './slices';
import * as languages from './languages';

export default combineReducers({
  ...slices,
  ...languages
});
