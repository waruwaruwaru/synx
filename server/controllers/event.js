const GameEvent = require('../models/game_event');

exports.addEvent = function(req, res, next) {
  const game = req.body.game;
  const location = req.body.location;

  const gameEvent = new GameEvent({
    game: game,
    location: location
  });

  gameEvent.save(function(err) {
    if(err) { return next(err); }
    //Respond to request indicating the user was created
    res.json({ message: "Game event is saved" });
  });
}

exports.fetchEvents = function(req, res, next) {
  //TODO: Fetch all the gameEvents in the DB
}
