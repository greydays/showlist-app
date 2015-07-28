'use strict';

var eat = require('eat');
var Venue = require('../models/Venue');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.eat || req.body.eat;
    if (!token) {
      console.log('unauthorized no token in request');
      return res.status(401).json({msg: 'not authorized'});
    }

    eat.decode(token, secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'not authorized'});
      }
      Venue.findOne({_id: decoded.id}, function(err, venue) {
        if (err) {
          console.log(err);
          return res.status(401).json({msg: 'not authorized'});
        }
        if (!venue) {
          console.log('no venue found for that token');
          return res.status(401).json({msg: 'not authorized'});
        }

        req.venue = venue;
        next();
      });
    });
  };
};
