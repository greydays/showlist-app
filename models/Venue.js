'use strict';

var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var venueSchema = Schema({
  name: String,
  location: String,
  shows: [{type: Schema.Types.ObjectId, ref: 'Show'}],
  website: String,
  social: String,
  address: String,
  image: String, //upload images if time
  contact: String
});

module.exports = mongoose.model('Venue', venueSchema);
