var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var bandSchema = new Schema({
  name: {type: String, unique: true},
  shows: [{type: Schema.Types.ObjectId, ref: 'Show'}],
  website: String,
  genre: String,
  social: String,
  image: String, //upload images if time
  contact: String,
  basic: { //could include twitter/fb login
    email: {type: String, unique: true},
    password: String
  }
});

module.exports = mongoose.model('Band', bandSchema);