import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GoogleMap from './google_maps';
import { reduxForm } from 'redux-form';

class Feature extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      markers: []
    }
  }
  componentWillMount() {
    this.props.fetchMessage();
  }

  onSubmit(props) {
    console.log("hello");
  }

  render() {
    const { fields: { game, address }, handleSubmit } = this.props;
    console.log(this.props);
    return (
      <div id="feature">
        {this.props.message}
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Game:</label>
            <input className="form-control" />
          </fieldset>

          <fieldset className="form-group">
            <label>Address:</label>
            <input className="form-control" />
          </fieldset>
          <button action="submit" className="btn btn-primary">Submit!</button>
        </form>
        <GoogleMap />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}
export default reduxForm({
  form: 'feature',
  fields: ['game', 'address']
}, mapStateToProps, actions)(Feature);
