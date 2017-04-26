import React, { Component } from 'react';
import { connect } from 'react-redux';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: []
    }
  }

  componentDidMount() {
    var uluru = {lat: 37.8044, lng: -122.419416};
    this.state.map = new google.maps.Map(this.refs.map, {
    zoom: 12,
    center: uluru
    });

    var marker = new google.maps.Marker({
      position: uluru,
      map: this.state.map
    });
  }

  addMarker() {
    console.log(this.props.location.location);
    // this.setState({markers: [{lat: 38.8044, lng: -122.419416}, {lat: 40.8044, lng: -122.419416}, {lat: 50.8044, lng: -122.419416}]});
    // var marks = [];
    // for(var i = 0; i < this.state.markers.length; i++) {
    //   console.log(this.state.markers[i]);
    //   marks[i] = new google.maps.Marker({
    //     position: this.state.markers[i],
    //     map: this.state.map
    //   });
    // }
  }

  render() {
    return(
      <div>
        <div ref="map" id="googleMap" />
        <button onClick={this.addMarker.bind(this)}>Button</button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { location: state.location };
}
export default connect(mapStateToProps)(GoogleMap);
