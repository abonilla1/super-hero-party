const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  postedBy: String,
  content: String,
  avatar: String,
}, {
  timestamps: true
})

module.exports = mongoose.model("Message", messageSchema)