import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: [],
    }
  }

  componentWillMount() {
    this.props.fetchMarkers();
  }

  componentDidMount() {
    var uluru = {lat: 37.8044, lng: -122.419416};
    this.state.map = new google.maps.Map(this.refs.map, {
    zoom: 12,
    center: uluru
    });

    //You are getting an empty on fetchedMarkers because maybe it takes too long for AJAX call to finish,
    //So... what happen is when you console.log this.props.fetchMarkers, it is giving the initial state before
    //the AJAX call finished, which is an empty object {}.
    //http://stackoverflow.com/questions/39243725/wait-for-an-ajax-request-to-complete-in-react
    //I moved this logic to addMarker() method button, but ideally you should make it display when page load
    //without the help of a button
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
    //Add this marker to DB
    // console.log({game: this.props.game, location: this.props.location.location});
    this.props.addEvent({game: this.props.game, location: this.props.location.location});
    console.log(this.props.fetchedMarkers.markers);
    for(var i = 0; i < this.props.fetchedMarkers.markers.length; i++) {
      var mark;
      var game = this.props.fetchedMarkers.markers[i].game;
      var location = JSON.parse(this.props.fetchedMarkers.markers[i].location);
      //Display marker location on Google Map
      mark = new google.maps.Marker({
        position: location,
        map: map
      });
      this.addInfoWindow(location, game);
    }
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
  return {
    location: state.location,
    fetchedMarkers: state.markers
   };
}
export default connect(mapStateToProps, actions)(GoogleMap);
