import React, { Component } from 'react';
import _ from 'lodash';
class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      currentImage: ''
    };
    //this.currentImage();
  }

  componentDidMount() {
    this.currentImage()
  }

  currentImage() {
    var imageArray = [
      'http://www.3ddesktops.co.uk/file/118/2880x1800/crop/hearthstone-heroes-of-warcraft.jpg',
      'https://i.ytimg.com/vi/it3Mym3MyWs/maxresdefault.jpg',
      'http://www.hdwallpapers.in/walls/overwatch_4k-HD.jpg'
    ];

    this.setState({ currentImage: imageArray[1] });
  }

  render() {
    return(
      <div id="welcome">
        {
          <img src= {this.state.currentImage} />
        }
      </div>
    );
  }
}

export default Welcome;
