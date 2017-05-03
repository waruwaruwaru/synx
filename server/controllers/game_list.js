const Game = require('../models/user');

exports.addgame = function(req, res, next) {
  const game = new User({
    game: game,
    address: address
  });

  game.save(function(err) {
    if(err) { return next(err); }
    //Respond to request indicating the user was created
    res.json({ message: "Game event is saved" });
  });
}
