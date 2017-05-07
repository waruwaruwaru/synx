import { FETCH_MARKERS } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_MARKERS:
    // console.log(action.payload);
      return { ...state, markers: action.payload };
  }

  return state;
}
