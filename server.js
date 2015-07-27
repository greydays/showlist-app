var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/users');

app.use(passport.initialize());

var venueRouter = express.Router();
require('./routes/venue-router')(venueRouter);

var authRouter = express.Router();
require('./routes/auth-routes')(authRouter);

// app.use('/venue', require('./middlewares/verify'));
app.use('/venue', venueRouter);
app.use('/', authRouter);

app.listen(port, function() {
  console.log('Server started on port ' + port);
});


// venue auth login
// if time, artist login
// sorting shows based on different criteria
// past shows should not be displayed
