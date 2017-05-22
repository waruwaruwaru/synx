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
      <div className="chat">
        <input type="text" className="chat-name" placeholder="Enter your name" />
        <div className="chat-messages">
          <div className="chat-message">Susan: Meow</div>
          <div className="chat-message">Issac: Wolf!</div>
          <div className="chat-message">ASdF: ASDF!</div>
          <div className="chat-message">asddsffs: asdasd</div>
          <div className="chat-message">qweqwe: qwerty</div>
        </div>
        <textarea placeholder="Type your messages"></textarea>
        <div className="chat-status">Status: <span>Idle</span> </div>
      </div>
    );
  }
}

export default Chat;
