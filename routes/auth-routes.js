'use strict';

var Venue = require('../models/Venue');
var bodyParser = require('body-parser');

module.exports = function(router, passport) {
  router.use(bodyParser.json());

  router.post('/create_venue', function(req, res) {
    var newVenue = new Venue();
    newVenue.basic.email = req.body.email;
    newVenue.basic.password = newVenue.generateHash(req.body.password);
    newVenue.save(function(err, venue) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: err});
      }

      venue.generateToken(process.env.APP_SECRET, function(err, token) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'error generating token'});
        }
        res.json({token: token});
      });
    });
  });

  router.get('/login', passport.authenticate('basic', {session: false}), function(req, res) {
    req.user.generateToken(process.env.APP_SECRET, function(err, token) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'error generating token'});
      }
      res.json({venue: req.user, token: token});
    });
  });
};
