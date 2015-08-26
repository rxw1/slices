import { get } from '../fetch';

import {
  FETCH_SLICES,
  RECEIVE_SLICES,
  SELECT_SLICE,
  RECEIVE_REFERENCES,
  FETCH_REFERENCES,
  SAMPLE_SLICES,
  CROP_SELECTED_SLICE,
  REQUEST_FRAGMENT,
  RECEIVE_FRAGMENT,
  CLEAR_SEARCH
} from './types';

function receiveSlices(payload) {
  return {
    type: RECEIVE_SLICES,
    payload: payload,
    receivedAt: Date.now()
  };
}

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

export function selectSlice(sliceID) {
  return dispatch => {
    dispatch(makeSelected(sliceID));
    dispatch(requestReferences(sliceID));
    return get(`/api/slices/${sliceID}/refs`)
      .then(result => dispatch(receiveReferences(result)));
  }
}

export function sampleSlices() {
  return dispatch => {
    dispatch(requestSlices());
    return get('/api/slices')
      .then(result => dispatch(receiveSlices(result)));
  }
}

function requestFragment(query) {
  return {
    type: REQUEST_FRAGMENT,
    payload: query
  }
}

function receiveFragment(payload) {
  return {
    type: RECEIVE_FRAGMENT,
    payload: payload
  }
}

export function findFragment(query) {
  return dispatch => {
    dispatch(requestFragment(query));
    return get(`/api/slices/f/${query}`)
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
    type: CLEAR_SEARCH
  }
}
