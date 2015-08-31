import {
  CLEAR_SLICES,
  CLEAR_SEARCH,
  CLEAR_SELECT,
  RECEIVE_REFERENCES,
  RECEIVE_SLICES,
  RECEIVE_SLICES_UPDATE,
  REQUEST_SLICES,
  REQUEST_SLICES_SAMPLE,
  REQUEST_SLICES_WITH_INSTANCES,
  SEARCH_QUERY,
  SEARCH_RESPONSE,
  SELECT_SLICE,
  RECEIVE_SLICES_HITS,
  CLEAR_REFERENCES
} from '../actions/types';

import uniq from 'lodash/array/uniq';
import findIndex from 'lodash/array/findIndex';

export function slices(state = [], action) {
  switch (action.type) {
    case RECEIVE_SLICES:
      return uniq([...state, ...action.payload], 'sliceID');
    case RECEIVE_SLICES_UPDATE:
      const idx = findIndex(state, slice => slice.sliceID === action.payload.sliceID);
      state.splice(idx, 1, action.payload);
      return [...state];
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
    case CLEAR_SELECT:
    case CLEAR_REFERENCES:
      return [];
    case RECEIVE_REFERENCES:
      return action.payload.map(reference => reference.sliceID);
    default:
      return state;
  }
}

export function selected(state = [], action) {
  switch (action.type) {
    case CLEAR_SELECT:
      if (action.hasOwnProperty('sliceID')) {
        const idx = findIndex(state, sliceID => sliceID === action.sliceID);
        state.splice(idx, 1, action.payload);
        return [...state];
      } else {
        return [];
      }
    case SELECT_SLICE:
      return uniq([...state, action.sliceID]);
    default:
      return state;
  }
}

export function searched(state = [], action) {
  switch (action.type) {
    case SEARCH_RESPONSE:
      return [...action.payload.hits.hits];
    case CLEAR_SEARCH:
      return [];
    case RECEIVE_SLICES_HITS:
      return [...action.payload];
    default:
      return state;
  }
}
