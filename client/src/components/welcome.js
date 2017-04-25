import React, { Component } from 'react';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      currentImage: ''
    };
    this.imageIndex = 0;
  }
  componentDidMount() {
    this.currentImage();
    this.changeImage = setInterval(this.currentImage.bind(this), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.changeImage);
  }

  currentImage() {
    console.log("debouncing");
    if(this.imageIndex > 2) {
      this.imageIndex = 0;
    }
    var imageArray = [
      'http://www.3ddesktops.co.uk/file/118/2880x1800/crop/hearthstone-heroes-of-warcraft.jpg',
      'https://i.ytimg.com/vi/it3Mym3MyWs/maxresdefault.jpg',
      'http://www.hdwallpapers.in/walls/overwatch_4k-HD.jpg'
    ];

    this.setState({ currentImage: imageArray[this.imageIndex] });
    this.imageIndex++;
  }

  render() {
    return(
      <div id="welcome">
          <img src= {this.state.currentImage} />
          <section id="banner">
  					<div className="content">
  						<header>
  							<h2>Community Driven Gaming</h2>
  							<p>Linking players from all over the world for eSports.</p>
  						</header>
  						<span className="image"><img src="http://img.teapic.com/thumbs/201305/28/101143equidlezzkrowtlu.jpg.middle.jpg" alt="" /></span>
  					</div>
          </section>
      </div>
    );
  }
}

export default Welcome;
