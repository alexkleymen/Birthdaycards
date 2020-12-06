const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/BirthDayCard', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!')
});