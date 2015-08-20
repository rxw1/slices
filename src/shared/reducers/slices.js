import { RECEIVE_SLICES } from '../actions';

export default function slices(state = [], action) {
  switch (action.type) {
    case RECEIVE_SLICES:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
