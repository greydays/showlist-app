var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Venue = require('../models/Venue');
var Show = require('../models/Show');

module.exports = function(router) {
  router.use(bodyParser.json());

  router.route('/')
    .post(function(req, res) {
      var venue = new Venue(req.body);
      venue.save(function(err, user) {
        if (err) {
          return res.status(500).json({msg: err});
        }
        res.json(venue);
      });
    });

  router.route('/:venue')
    .get(function(req, res) {
      var venueName = req.params.venue;
      Venue.findOne({name: venueName}, function(err, venue) {
        if (err) {
          return res.status(500).json({msg: err});
        }
        if (venue) {
          res.json(venue);
        } else {
          res.status(404).json({msg: 'Unable to locate ' + venueName});
        }
      });
    })
    .put(function(req, res) {
      var venueName = req.params.venue;
      var newVenue = req.body;

      Venue.update({name: venueName}, newVenue, function(err, venue) {
        if (err) {
          return res.status(500).json({msg: err});
        }
        if (venue) {
          res.json(venue);
        } else {
          res.status(404).json({msg: 'Unable to locate ' + venueName});
        }
      });
    })
    .delete(function(req, res) {
      var venueName = req.params.venue;
      Venue.findOne({name: venueName}, function(err, venue) {
        if (err) {
          return res.status(500).json({msg: err});
        }
        if (venue) {
          venue.remove();
          res.json({msg: venueName + ' was deleted'});
        } else {
          res.status(404).json({msg: 'Unable to locate ' + venueName});
        }
      })
    })
};
