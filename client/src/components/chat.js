import React, { Component } from 'react';
import io from 'socket.io-client';

class Chat extends Component {
  componentDidMount() {
    const socket = io.connect('http://localhost:3090/');
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }
  render() {
    return (
      <div id="chat">

      </div>
    );
  }
}

export default Chat;
