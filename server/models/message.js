const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: String,
  message: String
})


module.exports = mongoose.model('messages', messageSchema);
