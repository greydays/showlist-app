'use strict';

var Basic = require('passport-http').BasicStrategy;
var Venue = require('../models/Venue');

module.exports = function(passport) {
  passport.use('basic', new Basic({}, function(email, password, done) {
    Venue.findOne({'basic.email': email}, function(err, venue) {
      // db error
      if (err) {
        return done('database error');
      }
      // email not found
      if (!venue) {
        return done('no such venue');
      }
      //password does not match
      if (!venue.checkPassword(password)) {
        return done('wrong password');
      }
      return done(null, venue);
    });
  }));
};
