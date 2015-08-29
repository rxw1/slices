import {
  RECEIVE_SLICES,
  RECEIVE_REFERENCES,
  SELECT_SLICE,
  CLEAR_SLICES,
  SEARCH_RESPONSE,
  SEARCH_CLEAR
} from '../actions/types';

import uniq from 'lodash/array/uniq';

export function slices(state = [], action) {
  switch (action.type) {
    case RECEIVE_SLICES:
      return uniq([...state, ...action.payload], 'sliceID');
		case RECEIVE_REFERENCES:
      return uniq([...state, ...action.payload], 'sliceID');
		case CLEAR_SLICES:
			return [];
    default:
      return state;
  }
}

export function references(state = [], action) {
	switch (action.type) {
		case RECEIVE_REFERENCES:
			return action.payload.map(reference => reference.sliceID);
		default:
			return state;
	}
}

export function selected(state = [], action) {
	switch (action.type) {
		case SELECT_SLICE:
			return [action.payload];
		default:
			return state;
	}
}

export function searched(state = [], action) {
	switch (action.type) {
		case SEARCH_RESPONSE:
			return [...action.payload.hits.hits];
		case SEARCH_CLEAR:
			return [];
		default:
			return state;
	}
}

export function liked(state = [], action) {
	switch (action.type) {
		case LIKE:
			return [...state, ...action.sliceID];
		default:
			return state;
	}
}
