'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var settingsSchema = new Schema({
  showTitle: String

});

module.exports = mongoose.model('show', showsSchema, 'mainShows');
