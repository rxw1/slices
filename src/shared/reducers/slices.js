import {
  RECEIVE_SLICES,
  RECEIVE_REFERENCES,
  SELECT_SLICE
} from '../actions/types';

import uniq from 'lodash/array/uniq';
import sort from 'lodash/collection/sortBy';

export function slices(state = [], action) {
  switch (action.type) {
    case RECEIVE_SLICES:
      return uniq([...state, ...action.payload], 'sliceID');
    default:
      return state;
  }
}

export function references(state = [], action) {
	switch (action.type) {
		case RECEIVE_REFERENCES:
			return [...action.payload];
		default:
			return state;
	}
}

export function selected(state = {}, action) {
	switch (action.type) {
		case SELECT_SLICE:
			debugger
			// return [...action.payload]
			return Object.assign({}, action.payload);
		default:
			return state;
	}
}
