import {
  RECEIVE_SLICES,
  RECEIVE_REFERENCES,
  SELECT_SLICE,
  CROP_SELECTED_SLICE,
  SEARCH_RESPONSE,
  SEARCH_CLEAR
} from '../actions/types';

import uniq from 'lodash/array/uniq';
import sort from 'lodash/collection/sortBy';
import _ from 'lodash';
export function slices(state = [], action) {
  switch (action.type) {
    case RECEIVE_SLICES:
      return uniq([...state, ...action.payload], 'sliceID');
		case RECEIVE_REFERENCES:
      return uniq([...state, ...action.payload], 'sliceID');
		case CROP_SELECTED_SLICE:
			return [
				...state.filter(slice => slice.sliceID === action.sliceID),
				...state.filter(slice => _.contains(action.references, slice.sliceID))
			];
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
