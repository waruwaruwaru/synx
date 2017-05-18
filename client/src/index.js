import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Feature from './components/feature';
import Chat from './components/chat';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Guest from './components/auth/guest';
import requireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
window.store = store;
//If we have a token, consider the user to be signed in
if (token) {
  //we need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="guest" component={Guest} />
        <Route path="feature" component={requireAuth(Feature)} />
        <Route path="chat" component={requireAuth(Chat)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('#myapp'));
