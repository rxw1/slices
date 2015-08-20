import { get } from '../fetch';

export const FETCH_SLICES = 'FETCH_SLICES';

function requestSlices() {
  return {
    type: FETCH_SLICES
  };
}

export const RECEIVE_SLICES = 'RECEIVE_SLICES';

function receiveSlices(payload) {
  return {
    type: RECEIVE_SLICES,
    payload: payload,
    receivedAt: Date.now()
  };
}

export function fetchSlices() {
  return dispatch => {
    dispatch(requestSlices());
    return get('/slices')
      .then(json => dispatch(receiveSlices(json)));
  }
}
