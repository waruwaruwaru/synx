import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
 } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  //redux thunk allows us to return a function in a action creator and it will automatically call dispatch method

  return function(dispatch) {
    //Submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password }) //passing in {email:email, password:password} ES6 syntax
      .then(response => {
        //If request is good
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT Token
        localStorage.setItem('token', response.data.token); //localStorage is a built in function from windows.
        // - redirect to router '/feature'
        browserHistory.push('/feature');
      })

      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signupUser({ email, password }) { //notice we dont pass in passwordConfirm because server does not know what that is
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
    .then(response => {
      //If request is good
      // - Update state to indicate user is authenticated
      dispatch({ type: AUTH_USER });
      // - Save the JWT Token
      localStorage.setItem('token', response.data.token); //localStorage is a built in function from windows.
      // - redirect to router '/feature'
      browserHistory.push('/feature');
    })

    .catch(error => { //Have to use error => instead of response => because axios library changed
      dispatch(authError(error.response.data.error));
    });
  }
}

export function signoutUser() {
  //We don't want a user to have a token anymore since they're signed out
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  //we can use redux promise but we will use redux thunk for consistency
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}
