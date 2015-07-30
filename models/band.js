var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var bandSchema = new Schema({
  name: String,
  shows: [{type: Schema.Types.ObjectId, ref: 'Show'}],
  website: String,
  genre: String,
  social: String,
  image: String, //upload images if time
});

module.exports = mongoose.model('Band', bandSchema);