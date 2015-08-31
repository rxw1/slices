import {
	RECEIVE_LANGUAGES
} from '../actions/types';

import uniq from 'lodash/array/uniq';
import sort from 'lodash/collection/sortBy';

export function languages (state = [], action) {
  switch (action.type) {
    case RECEIVE_LANGUAGES:
      return uniq(sort([...state, ...action.payload]));
    default:
      return state;
  }
}
