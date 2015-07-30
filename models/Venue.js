'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');
var Schema = mongoose.Schema;

var venueSchema = new Schema({
  name: String,
  userName: {type: String, unique: true},
  location: String,
  shows: [{type: Schema.Types.ObjectId, ref: 'Show'}],
  website: String,
  social: String,
  address: String,
  image: String, //upload images if time
  contact: String,
  basic: { //could include twitter/fb login
    email: {type: String, unique: true, sparse: true},
    password: String
  }
});

// currently sync, can change to async
venueSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

venueSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

// change id to hash, hash id needs to be stored in db
// look at uuid library or guid library
venueSchema.methods.generateToken = function(secret, callback) {
  eat.encode({id: this._id}, secret, callback);
};

venueSchema.methods.owns = function(obj) {
  return obj.venue === this._id;
};

module.exports = mongoose.model('Venue', venueSchema);
