var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

process.env.APP_SECRET = process.env.APP_SECRET || 'changethis';

app.use(express.static(__dirname + '/app'));

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost');

var authRouter = express.Router();
var venueRouter = express.Router();
var showRouter = express.Router();
var bandRouter = express.Router();

app.use(passport.initialize());

require('./lib/passport-strat')(passport);

require('./routes/auth-routes')(authRouter, passport);
require('./routes/show-router')(showRouter);
require('./routes/venue-router')(venueRouter);
require('./routes/band-router')(bandRouter);

app.use('/venue', authRouter);
app.use('/venue', venueRouter);
app.use('/show', showRouter);
app.use('/band', bandRouter);

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server started on port ' + port);
});
