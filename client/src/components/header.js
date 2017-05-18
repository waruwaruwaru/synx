import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    //if user is signed inz
    if (this.props.authenticated) {
      //Show a sign out link
      return (
        <li>
          <Link to="/signout">Sign Out</Link>
        </li>
      );
    }

    else {
      //Show a sign up or sign in Link
      return [
        <li key={1}>
          <Link to="/signin">Sign In</Link>
        </li>,
        <li key={2}>
          <Link to="/signup">Sign Up</Link>
        </li>,
        <li key={3}>
          <Link to="/guest">Guest Login</Link>
        </li>
      ];

    }
  }

  render() {
    return(
      <div>
        <header id="header">
          <h1 id="synx"><Link to='/'>Synx</Link></h1>
          <nav id="nav">
            <ul>
              <li key={4}><Link to='feature'>Find</Link></li>
              <li key={5}><Link to='chat'>Chat</Link></li>
                {this.renderLinks()}
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
