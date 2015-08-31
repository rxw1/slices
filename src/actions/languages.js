import { get } from '../fetch';

import {
  FETCH_LANGUAGES,
  RECEIVE_LANGUAGES
} from './types';

function receiveLanguages(payload) {
  return {
    type: RECEIVE_LANGUAGES,
    payload: payload,
    receivedAt: Date.now()
  };
}

function requestLanguages() {
  return {
    type: FETCH_LANGUAGES
  };
}

export function fetchLanguages() {
  return dispatch => {
    dispatch(requestLanguages());
    return get('/api/languages')
      .then(json => dispatch(receiveLanguages(json)));
  }
}
