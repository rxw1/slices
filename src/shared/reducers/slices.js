import {
  RECEIVE_SLICES,
  RECEIVE_REFERENCES,
  SELECT_SLICE
} from '../actions/types';

export default function slices(state = [], action) {
  switch (action.type) {
    case RECEIVE_SLICES:
      return [...state, ...action.payload];
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
