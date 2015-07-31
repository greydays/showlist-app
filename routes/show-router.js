'use strict';

var mongoose = require('mongoose');
var Show = require('../models/show');
var Venue = require('../models/Venue');
var eatAuth = require('../lib/eat-auth')(process.env.APP_SECRET);

module.exports = function(router) {
  // displays all shows
  router.get('/shows', function(req,res) {
		Show.find({}, function(err,data) {
			if (err) {
				res.status(500).json({msg: 'Internal Server Error'})
			}
			res.json(data)
		});
	});

  // displays specific show
	router.get('/:show', function(req, res) {
		var showId = req.params.show;
		Show.findOne({_id: showId}, function(err, show) {
			if (err) {
				console.log(err);
				res.status(500).json({msg: 'Internal server error'});
			}
			if (show) {
				res.json(show);
			} else {
				res.status(404).json({msg: 'Unable to locate ' + showId});
			}
		});
	});

	// deletes specific show
	router.delete('/shows/:show', function(req,res) {
		var showId = req.params.show;
		Show.findOne({_id: showId}, function(err,doc) {
			if (err){
				res.status(500).json(err)
			}
			doc.remove();
			res.json({msg: 'document was removed'});
		});
	});
};
