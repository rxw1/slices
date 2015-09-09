import {
	POST_RESPONSE,
	RECEIVE_POSTS
} from '../actions/types';

import { sort, uniq, findIndex } from 'lodash';

export function posts (state = [], action) {
  switch (action.type) {
    case POST_RESPONSE:
      return [...state, ...action.payload];
    case RECEIVE_POSTS:
      return uniq([...state, ...action.payload]);
    default:
      return state;
  }
}
