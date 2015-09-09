import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as slices from './slices';
import * as languages from './languages';
import * as posts from './posts';

export default combineReducers({
  ...slices,
  ...languages,
  ...posts,
  form: formReducer
});
