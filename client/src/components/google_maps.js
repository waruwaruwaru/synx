import React, { Component } from 'react';

class GoogleMap extends Component {
  componentDidMount() {
    var uluru = {lat: 37.8044, lng: -122.419416};
    var map = new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: uluru
    });

    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }

  render() {
    return(
      <div ref="map" id="googleMap" />
    );
  }
}

export default GoogleMap;
