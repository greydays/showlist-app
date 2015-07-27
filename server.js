var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost');



var venueRouter = express.Router();
var showRouter = express.Router();
// require('./routes/venue-router')(venueRouter);
require('./routes/show-router')(showRouter);
// app.use('/venue', venueRouter);

app.use('/show', showRouter);

app.listen(port, function() {
  console.log('Server started on port ' + port);
});


// venue auth login
// if time, artist login
// sorting shows based on different criteria
// past shows should not be displayed
