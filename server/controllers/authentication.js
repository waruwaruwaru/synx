const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

//Create a token for user
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  //first argument is what we want to encode, 2nd argument is what want to use
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret); //sub = subject, iat = issue at time, its a standard in jwt.
}

exports.signin = function(req, res, next) {
  //User has already had their email and password auth'd
  //We just need to give them a token
  res.send({ token: tokenForUser(req.user) }); //this req.user comes from the done(null, user) in the comparePassword function in passport.js
}
exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }
  //See if user with given email exists
  //findOne is a built in method that will find whatever is in the argument in the database
  //it then calls a callback function that will return an error or the existingUser
  User.findOne({ email: email }, function(err, existingUser) {
    if(err) { return next(err) };

    //If a user with email does exist. return an Error
    if(existingUser) {
      //code 422 means unprocessed entity. In our case we cannot process this because a user
      //with this email already exist.
      return res.status(422).send({ error: 'Email is in use' });
    }

    //If a user with an email does not exist, create and save record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if(err) { return next(err); }
      //Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    })
  });


}
