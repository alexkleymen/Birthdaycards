var mongoose = require('mongoose');
var Schema = mongoose.Schema;





const Event = new Schema({
  name:  String, 
  posts: [{
    type: Schema.Types.ObjectId,
    ref: "Posts",
  }],
  user: {type: Schema.Types.ObjectId,
        ref: "Users"}
  
});

module.exports =  mongoose.model('Events',Event);