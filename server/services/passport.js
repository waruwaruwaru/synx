const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//Create local Strategy
//By default Local Strategy looks for a username and password
//This localOption tells where to look for our username, which is our email in this case.
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  //Verify this email and password, call done with the user
  //if it is the correct email and password
  //otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {
    if(err) { return done(err); }
    if(!user) { return done(null, false); }

    //compare passwords - is `password` equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

//Setup Options for JWT Strategy
const jwtOptions = {
  //a JWT token can be anywhere: body, header, this line tells jwt token is in header called authorization
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret //We need to tell it the secret that it should use to decode the token
};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //The callback will invoke whenever a user needs to be authenticated with the jwt tokenForUser
  //Payload is the decoded jwt token. It will contain sub and iat

  //See if user ID in the payload exist in our database
  //if it does, call 'done' with that user
  //otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    //If we fail to access database
    if(err) { return done(err, false); }
    //If we found the user
    if(user) {
      done(null, user);
    }
    //If we did not find the user
    else {
      done(null, false);
    }
  });
});
//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
