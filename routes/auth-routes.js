'use strict';

var Venue = require('../models/Venue');
var bodyParser = require('body-parser');

module.exports = function(router) {
  router.use(bodyParser.json());

  router.post('/create_venue', function(req, res) {
    var venueData = JSON.parse(JSON.stringify(req.body));
    delete venueData.email;
    delete venueData.password;
    var newVenue = new Venue(venueData);
    newVenue.basic.email = req.body.email;
    newVenue.basic.password = newVenue.generateHash(req.body.password);
    newVenue.save(function(err, data) {
      if (err) {
        return res.status(500).json({msg: err});
      }
      //will send token
      res.json({msg: 'User created'});
    });
  });
};
