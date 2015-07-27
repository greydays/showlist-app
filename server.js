var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

process.env.APP_SECRET = process.env.APP_SECRET || 'changethis';

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost');

var venueRouter = express.Router();
var showRouter = express.Router();
var authRouter = express.Router();

app.use(passport.initialize());

require('./lib/passport-strat')(passport);

require('./routes/show-router')(showRouter);
require('./routes/venue-router')(venueRouter);
require('./routes/auth-routes')(authRouter, passport);

app.use('/venue', authRouter);
app.use('/venue', venueRouter);
app.use('/show', showRouter);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server started on port ' + port);
});


// venue auth login
// if time, artist login
// sorting shows based on different criteria
// past shows should not be displayed
