import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GoogleMap from './google_maps';
import { reduxForm } from 'redux-form';


class Feature extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: []
    }
  }
  componentWillMount() {
    this.props.fetchMessage();
    //this.props.getMarkers();
  }

  onSubmit(props) {
    //console.log(this.props.values.address);
    this.props.fetchLocation(this.props.values.address);
    /*Implement an add Marker function
    Do an HTTP call to some API that can get the location
    Save the location data into MongoDB
    redirect user to /feature, it should refresh and display all Markers in the database
    */
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
