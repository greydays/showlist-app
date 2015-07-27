'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = mongoose.Schema({
  showTitle: String,
  date: Date,
  venue: {type: Schema.Types.ObjectId, ref: 'Venue'},
  bands: String, //will update later
  cost: Number,
  time: Date,
  age: Boolean,
  image: String,
  social: [String]
});

module.exports = mongoose.model(showsSchema, 'Show');
