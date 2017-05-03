import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GoogleMap from './google_maps';
import { reduxForm } from 'redux-form';


class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
    //this.props.getMarkers();
  }

  onSubmit(props) {
    //Implement an add Marker function
    //Do an HTTP call to some API that can get the location
    this.props.fetchLocation(this.props.values.address);
    //Save the location data into MongoDB
    //redirect user to /feature, it should refresh and display all Markers in the database
  }

  render() {
    const { fields: { game, address }, handleSubmit } = this.props;
    return (
      <div id="feature">
        {this.props.message}
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Game:</label>
            <input type="text" className="form-control" {...game} />
          </fieldset>

          <fieldset className="form-group">
            <label>Address:</label>
            <input type="text" className="form-control" {...address} />
          </fieldset>
          <button type="submit" className="btn btn-primary">Submit!</button>
        </form>
        <GoogleMap game={ this.props.values.game } address={ this.props.values.address } />
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
