var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const user = new Schema({
    user:  String, 
    password: String,
    refreshToken: String,
    events : [{
      type: Schema.Types.ObjectId,
      ref : 'Events',
    }]
  });

module.exports =  mongoose.model('Users',user);