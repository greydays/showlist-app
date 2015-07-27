var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost');



app.use(passport.initialize());

var venueRouter = express.Router();
require('./routes/venue-router')(venueRouter);
var showRouter = express.Router();
require('./routes/show-router')(showRouter);

var authRouter = express.Router();
require('./routes/auth-routes')(authRouter);

// app.use('/venue', require('./middlewares/verify'));
app.use('/venue', venueRouter);
app.use('/show', showRouter);
app.use('/', authRouter);

app.listen(port, function() {
  console.log('Server started on port ' + port);
});


// venue auth login
// if time, artist login
// sorting shows based on different criteria
// past shows should not be displayed
