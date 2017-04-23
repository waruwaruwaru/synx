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
  							<h2>The future has landed</h2>
  							<p>Linking players from all over the world for eSports.</p>
  						</header>
  						<span className="image"><img src="http://www.noveir.com/wp-content/uploads/2014/12/hearthstone-opening.jpg" alt="" /></span>
  					</div>
  					<a href="#one" className="goto-next scrolly">Next</a>
  				</section>


          <section id="one" class="spotlight style1 bottom">
            <span class="image fit main"><img src="" alt="" /></span>
            <div class="content">
              <div class="container">
                <div class="row">
                  <div class="4u 12u$(medium)">
                    <header>
                      <h2>Odio faucibus ipsum integer consequat</h2>
                      <p>Nascetur eu nibh vestibulum amet gravida nascetur praesent</p>
                    </header>
                  </div>
                  <div class="4u 12u$(medium)">
                    <p>Feugiat accumsan lorem eu ac lorem amet sed accumsan donec.
                    Blandit orci porttitor semper. Arcu phasellus tortor enim mi
                    nisi praesent dolor adipiscing. Integer mi sed nascetur cep aliquet
                    augue varius tempus lobortis porttitor accumsan consequat
                    adipiscing lorem dolor.</p>
                  </div>
                  <div class="4u$ 12u$(medium)">
                    <p>Morbi enim nascetur et placerat lorem sed iaculis neque ante
                    adipiscing adipiscing metus massa. Blandit orci porttitor semper.
                    Arcu phasellus tortor enim mi mi nisi praesent adipiscing. Integer
                    mi sed nascetur cep aliquet augue varius tempus. Feugiat lorem
                    ipsum dolor nullam.</p>
                  </div>
                </div>
              </div>
            </div>
            <a href="#two" class="goto-next scrolly">Next</a>
          </section>
      </div>
    );
  }
}

export default Welcome;
