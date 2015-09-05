import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as slices from './slices';
import * as languages from './languages';

export default combineReducers({
  ...slices,
  ...languages,
  form: formReducer
});
