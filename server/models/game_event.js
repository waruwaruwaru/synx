const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const gameEventSchema = new Schema({
  game: String,
  location: String
})


module.exports = mongoose.model('gameEvent', gameEventSchema)
