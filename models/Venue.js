'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var venueSchema = new Schema({
  name: String,
  location: String,
  shows: [{type: Schema.Types.ObjectId, ref: 'Show'}],
  website: String,
  social: String,
  address: String,
  image: String, //upload images if time
  contact: String,
  basic: { //could include twitter/fb login
    email: {type: String, unique: true},
    password: String
  }
});

venueSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

venueSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

module.exports = mongoose.model('Venue', venueSchema);


// var venue = new Venue ({
//   name: 'test venue',
//   location: 'test location',
//   website: 'test',
//   social: 'test',
//   address: 'test',
//   image: 'test',
//   contact: 'test',
// })






