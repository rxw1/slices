import {
  POST_SUBMIT,
  POST_RESPONSE,
  RECEIVE_POSTS,
  REQUEST_POSTS
} from './types';

import { get, post } from '../fetch';

function postSubmit(data) {
  return {
    type: POST_SUBMIT,
    data
  };
}

function postResponse(payload) {
  return {
    type: POST_RESPONSE,
    payload: payload.changes.map(x => x.new_val)
  };
}

function receivePosts(payload) {
  return {
    type: RECEIVE_POSTS,
    payload
  };
}

function requestPosts(postID) {
  return {
    type: REQUEST_POSTS,
    postID
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
      body: JSON.stringify({data})
    })
    .then(response => response.json())
    .then(json => dispatch(postResponse(json)));
  }
}

export function getAllPosts() {
  return dispatch => {
    dispatch(requestPosts());
    return get(`/api/posts`)
      .then(result => dispatch(receivePosts(result)));
  }
}
