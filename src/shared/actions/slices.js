import { get } from '../fetch';

import {
  FETCH_SLICES,
  RECEIVE_SLICES,
  SELECT_SLICE,
  RECEIVE_REFERENCES,
  FETCH_REFERENCES,
  SAMPLE_SLICES,
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
