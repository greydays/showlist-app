var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({
  showTitle: String,
  date: Date,
  venue: {type: Schema.Types.ObjectId, ref: 'Venue'},
  bands: {type: Schema.Types.ObjectId, ref: 'Bands'}, //will update later
  description: String,
  cost: Number,
  time: Date,
  age: Boolean,
  image: String,
  social: String
});

module.exports = mongoose.model('Show', showSchema);
