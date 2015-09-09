import {
  POST_SUBMIT,
  POST_RESPONSE
} from './types';

import { get, post } from '../fetch';

function postSubmit(data) {
  return {
    type: POST_SUBMIT,
    data
  };
}

function postResponse(data) {
  return {
    type: POST_RESPONSE,
    data: data.changes.map(x => x.new_val)
  };
}

export function sendFormData(data) {
  return dispatch => {
    dispatch(postSubmit(data));
    return fetch(`/api/posts`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(postResponse(json)));
  }
}
