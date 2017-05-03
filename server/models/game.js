const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const gameSchema = new Schema({
  game: String,
  address: String
})

module.exports = mongoose.model('game', gameSchema)
