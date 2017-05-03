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

    // var marker = new google.maps.Marker({
    //   position: uluru,
    //   map: this.state.map
    // });
  }

  addInfoWindow(marker, content) {
    var map = this.state.map;
    var infoWindow = new google.maps.InfoWindow({
        content: content
    });
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
    });
  }

  addMarker() {
    //console.log(this.props.location.location);
    //console.log(this.state.markers);
    var map = this.state.map;
    var markers = this.state.markers;
    markers.push(this.props.location.location);
    this.setState({ markers: markers }, function(){
      var mark;
      //Display marker location on Google Map
      mark = new google.maps.Marker({
        position: this.state.markers[this.state.markers.length - 1],
        map: map
      });
      //Call helper method to create description for Marker
      this.addInfoWindow(mark, this.props.game);
    });
  }


  render() {
    return(
      <div>
        <div ref="map" id="googleMap" />
        <button id="fetchGame" className="btn btn-primary" onClick={this.addMarker.bind(this)}>Fetch Games</button>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { location: state.location };
}
export default connect(mapStateToProps)(GoogleMap);
