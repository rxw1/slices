import { get } from '../fetch';

import {
  FETCH_SLICES,
  RECEIVE_SLICES,

  SELECT_SLICE,

  RECEIVE_REFERENCES,
  FETCH_REFERENCES,

  CROP_SELECTED_SLICE,

  SEARCH_QUERY,
  SEARCH_CLEAR,
  SEARCH_RESPONSE
} from './types';

function receiveReferences(payload) {
  return {
    type: RECEIVE_REFERENCES,
    payload: payload,
    receivedAt: Date.now()
  };
}

function requestSlices(sliceID) {
  return {
    type: FETCH_SLICES,
    sliceID: sliceID
  };
}

function requestReferences(sliceID) {
  return {
    type: FETCH_REFERENCES,
    sliceID: sliceID
  };
}

function makeSelected(payload) {
  return {
    type: SELECT_SLICE,
    payload: payload
  };
}

function receiveSlices(payload) {
  return {
    type: RECEIVE_SLICES,
    payload: payload,
    receivedAt: Date.now()
  };
}

function requestFragment(query) {
  return {
    type: SEARCH_QUERY,
    payload: query
  }
}

function receiveFragment(payload) {
  return {
    type: SEARCH_RESPONSE,
    payload: payload
  }
}

export function findFragment(query) {
  return dispatch => {
    dispatch(requestFragment(query));
    return get(`/api/slices/search/${query}`)
      .then(result => dispatch(receiveFragment(result)));
  }
}

export function cropSelectedSlice(sliceID) {
  return {
    type: CROP_SELECTED_SLICE,
    sliceID: sliceID
  }
}

export function clearSearch() {
  return {
    type: SEARCH_CLEAR
  }
}

export function selectSlice(sliceID) {
  return dispatch => {
    dispatch(makeSelected(sliceID));
    // dispatch(requestSlices(sliceID));
    return get(`/api/slices/${sliceID}/refs`)
      .then(result => dispatch(receiveReferences(result)));
  }
}

export function fetchReferences(sliceID) {
  return dispatch => {
    dispatch(requestReferences(sliceID));
    return get(`/api/slices/${sliceID}/refs`)
      .then(result => dispatch(receiveReferences(result)));
  }
}

export function sampleSlices(count) {
  return dispatch => {
    dispatch(requestSlices(count));

    return get(`/api/slices/sample${count ? (count ? 'count/' + count : '') : ''}`)
      .then(result => dispatch(receiveSlices(result)));
  }
}
