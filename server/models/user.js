const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


//Define our model
const userSchema = new Schema({
  //We pass in an object to email because
  //we want it to also contain the unique property.
  //So no other people can have the same email, lowercase true is to prevent STEVE@GMAIL.COM
  //to be same as steve@gmail.com because they're different
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//On Save Hook, encrypt password
//Before saving a model, run this function
userSchema.pre('save', function(next) {
  //Get access to user model
  const user = this;

  //Generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if(err) { return next(err); }

    //hash (encrypt) our password using salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }

      //overwrite plain text password with encrypted password
      user.password = hash;
      //next() is save the model.
      next();
    });
  });
});

//Whenever we create a user object it will have access to this function. Like Array.prototype
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) { return isMatch(err); }

    callback(null, isMatch);
  })
}



//Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model class
module.exports = ModelClass;
