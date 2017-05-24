const ChatMessage = require('../models/game_event');

exports.addMessage = function(req, res, next) {
  const user = req.body.user;
  const message = req.body.message;

  const chatMessage = new ChatMessage({
    user: String,
    message: String
  });

  chatMessage.save(function(err) {
    if(err) { return next(err); }
    //Respond to request indicating the user was created
    res.json({ message: "chat is saved" });
  });
}

exports.fetchMessages = function(req, res, next) {
  //TODO: Fetch all the gameEvents in the DB
  ChatMessage.find(function(err, chat) {
    if(err)
      res.json("error");
    res.send(chat);
  });
}
