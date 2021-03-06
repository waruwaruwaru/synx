import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import locationReducer from './location_reducer';
import markersReducer from './markers_reducer';

const rootReducer = combineReducers({
  form, //form : form ES6 syntax
  auth: authReducer,
  location: locationReducer,
  markers: markersReducer
});

export default rootReducer;
