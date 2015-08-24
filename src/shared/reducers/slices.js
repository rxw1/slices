import {
  RECEIVE_SLICES,
  RECEIVE_REFERENCES,
  SELECT_SLICE,
  CROP_SELECTED_SLICE
} from '../actions/types';

import uniq from 'lodash/array/uniq';
import sort from 'lodash/collection/sortBy';

export function slices(state = [], action) {
  switch (action.type) {
    case RECEIVE_SLICES:
      return uniq([...state, ...action.payload], 'sliceID');
		case RECEIVE_REFERENCES:
      return uniq([...state, ...action.payload], 'sliceID');
		case CROP_SELECTED_SLICE:
			debugger
			let newState = state.filter(slice => slice.sliceID === action.sliceID);
			return [...newState];
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
			return [/*...state, */action.payload];
		default:
			return state;
	}
}
