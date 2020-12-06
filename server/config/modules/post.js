var mongoose = require('mongoose');
const { schema } = require('./users');
var Schema = mongoose.Schema;


const Post = new Schema({
  name: String,
  content: String,
  picture: String,
  event : {
    type: Schema.Types.ObjectId,
    ref : "Events"
  }
 
  
})

module.exports = mongoose.model('Posts',Post)