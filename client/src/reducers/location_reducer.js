import { FETCH_LOCATION } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_LOCATION:
      return { ...state, location: action.payload };
  }

  return location;
}
