import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Guest extends Component {
  componentWillMount() {
    this.props.guestUser();
  }

  render() {
    return <div id="guest">You are now logged in</div>
  }
}


export default connect(null, actions)(Guest);
