import {
  RECEIVE_SLICES,
  RECEIVE_REFERENCES,
  SELECT_SLICE,
  CROP_SELECTED_SLICE,
  RECEIVE_FRAGMENT,
  CLEAR_SEARCH
} from '../actions/types';

import uniq from 'lodash/array/uniq';
import sort from 'lodash/collection/sortBy';
import _ from 'lodash';
export function slices(state = [], action) {
  switch (action.type) {
    case RECEIVE_SLICES:
    debugger
      return uniq([...state, ...action.payload], 'sliceID');
		case RECEIVE_REFERENCES:
      return uniq([...state, ...action.payload], 'sliceID');
		case CROP_SELECTED_SLICE:
		debugger
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
		case RECEIVE_FRAGMENT:
			return [...action.payload.hits.hits];
		case CLEAR_SEARCH:
			return [];
		default:
			return state;
	}
}
