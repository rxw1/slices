import {
  REQUEST_SLICES,
  REQUEST_SLICES_SAMPLE,
  REQUEST_SLICES_WITH_INSTANCES,
  RECEIVE_SLICES,
  REQUEST_REFERENCES,
  RECEIVE_REFERENCES,
  SEARCH_QUERY,
  SELECT_SLICE,
  TOGGLE_LIKE,
  CLEAR_SLICES,
  LIKE_SLICE,
  UNLIKE_SLICE,
  RECEIVE_SLICES_UPDATE,
  REQUEST_LIKED_SLICES,
  RECEIVE_SLICES_HITS,
  UPVOTE,
  DOWNVOTE,
  CLEAR_SEARCH,
  CLEAR_SELECT
} from './types';

import { get, post } from '../fetch';

// (1) before xhr response (this is what you order)

function requestSlices(sliceID) {
  return {
    type: REQUEST_SLICES,
    sliceID
  };
}

function requestSlicesWithInstances() {
  return {
    type: REQUEST_SLICES_WITH_INSTANCES
  };
}

function requestSlicesSample() {
  return {
    type: REQUEST_SLICES_SAMPLE
  };
}

function requestLikedSlices() {
  return {
    type: REQUEST_LIKED_SLICES
  };
}

function requestReferences() {
  return {
    type: REQUEST_REFERENCES
  }
}

// (2) receive (this is what you get)

function receiveSlices(payload) {
  return {
    type: RECEIVE_SLICES,
    payload,
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

function receiveSlicesHits(searchResult) {
  return {
    type: RECEIVE_SLICES_HITS,
    payload: searchResult.hits.map(hit => hit._source),
    receivedAt: Date.now(),
    total: searchResult.total,
    maxScore: searchResult.max_score
  };
}

function receiveSlicesUpdate(payload) {
  return {
    type: RECEIVE_SLICES_UPDATE,
    payload,
    updatedAt: Date.now()
  };
}

// => reducer caring about selected slices
function selectSlice(sliceID) {
  return {
    type: SELECT_SLICE,
    sliceID
  };
}

// exported API functions a.k.a. action creators (I guess)

export function select(sliceID) {
  return dispatch => {
    dispatch(selectSlice(sliceID));
    dispatch(requestReferences(sliceID));
    return get(`/api/slices/${sliceID}/refs`)
      .then(result => dispatch(receiveReferences(result)));
  }
}

// request some slices

export function slicesSample(count) {
  return dispatch => {
    dispatch(requestSlicesSample());
    return get(`/api/slices/sample`)
      .then(result => dispatch(receiveSlices(result)));
  }
}

export function slicesWithInstances() {
  return dispatch => {
    dispatch(requestSlicesWithInstances());
    return get(`/api/slices/withInstances`)
      .then(result => dispatch(receiveSlices(result)));
  }
}

// search

export function findFragment(query) {
  return dispatch => {
    dispatch(searchQuery(query));
    return get(`/api/slices/search/${query}`)
      .then(result => dispatch(receiveSlicesHits(result.hits)));
  }
}

function searchQuery(query) {
  return {
    type: SEARCH_QUERY,
    payload: query
  }
}

// like

export function like(sliceID) {
  return dispatch => {
    dispatch(likeSlice(sliceID));
    return post(`/api/slices/${sliceID}/like`)
      .then(result => dispatch(receiveSlicesUpdate(result)));
  }
}

export function likedSlices() {
  return dispatch => {
    dispatch(requestLikedSlices());
    return get(`/api/slices/liked`)
      .then(result => dispatch(receiveSlices(result)));
  }
}

export function getAllSlices() {
  return dispatch => {
    dispatch(requestSlices());
    return get(`/api/slices`)
      .then(result => dispatch(receiveSlices(result)));
  }
}

function likeSlice(sliceID) {
  return {
    type: LIKE_SLICE,
    sliceID
  }
}

function unlikeSlice(sliceID) {
  return {
    type: UNLIKE_SLICE,
    sliceID
  }
}

// upvote/downvote

export function upvote(sliceID) {
  return dispatch => {
    dispatch(upvoteSlice(sliceID));
    return post(`/api/slices/${sliceID}/upvote`)
      .then(result => dispatch(receiveSlicesUpdate(result)));
  }
}

export function downvote(sliceID) {
  return dispatch => {
    dispatch(downvoteSlice(sliceID));
    return post(`/api/slices/${sliceID}/downvote`)
      .then(result => dispatch(receiveSlicesUpdate(result)));
  }
}

function upvoteSlice(sliceID) {
  return {
    type: UPVOTE,
    sliceID: sliceID
  }
}

function downvoteSlice(sliceID) {
  return {
    type: DOWNVOTE,
    sliceID: sliceID
  }
}

// clear stuff

export function clearSlices() {
  return {
    type: CLEAR_SLICES
  }
}

export function clearSearch() {
  return {
    type: CLEAR_SEARCH
  }
}

export function clearSelect() {
  return {
    type: CLEAR_SELECT
  }
}

export function clearReferences() {
  return {
    type: CLEAR_REFERENCES
  }
}




// import {
//   CLEAR_SLICES,
//   FETCH_REFERENCES,
//   FETCH_SLICES,
//   LIKED,
//   RECEIVE_REFERENCES,
//   RECEIVE_SLICES,
//   SEARCH_CLEAR,
//   SEARCH_QUERY,
//   SEARCH_RESPONSE,
//   SELECT_SLICE,
//   SLICE_UPDATED,
//   UNLIKED
// } from './types';

// /*
//   XHR requests happen in three stages:
//   (1) action
//   (2) request: 
//   (3) receive: pass payload to reducer
// */

// function receiveReferences(payload) {
//   return {
//     type: RECEIVE_REFERENCES,
//     payload: payload,
//     receivedAt: Date.now()
//   };
// }

// function requestReferences(sliceID) {
//   return {
//     type: FETCH_REFERENCES,
//     sliceID: sliceID
//   };
// }

// function markSlice(sliceID) {
//   return {
//     type: SLICE_MARKED,
//     sliceID: sliceID
//   };
// }


// export function clearSearch() {
//   return {
//     type: SEARCH_CLEAR
//   }
// }

// // voting

// export function upvoteSlice(sliceID) {
//   return dispatch => {
//     return get(`/api/slices/${sliceID}/upvote`)
//       .then(result => dispatch(receiveUpdatedSlice(result)));
//   }
// }

// export function receiveUpdatedSlice(payload) {
//   return {
//     type: SLICE_UPDATED,
//     payload: payload
//   }
// }
