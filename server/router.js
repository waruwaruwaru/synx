const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const GameEvent = require('./controllers/event');
const ChatMessage = require('./controllers/chat');

const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });
//Tell passport to use jwt
//session : false so we dont make cookie because we are already using a token instead.


module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });
  app.get('/fetchEvents', GameEvent.fetchEvents);
  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup);
  app.post('/addEvent', GameEvent.addEvent);
  app.post('/chatMessage', ChatMessage.addMessage);
}
