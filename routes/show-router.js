'use strict';

var mongoose = require('mongoose');
var Show = require('../models/show');
var Venue = require('../models/Venue');
var eatAuth = require('../lib/eat-auth')(process.env.APP_SECRET);


module.exports = function(router) {
  router.route('/shows')
	.get(function(req,res) {
		Show.find({}, function(err,data) {
			if (err) {
				res.status(500).json({msg: 'Internal Server Error'})
			}
			res.json(data)
      //route gets all shows
		});
	})

	.delete(eatAuth, function(req,res) {
		Show.remove({}, function(err,data) {
			if (err) {
				res.status(500).json({msg: 'Internal Server Error'})
			}
			res.json({msg: 'shows have been deleted'})
		//this route deletes ALL SHOWS use with caution
		});
	});

	router.get('/:show', function(req, res) {
		var showId = req.params.show;
		console.log('reached get show route ' + showId);
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

	router.delete('/shows/:show', function(req,res) {
		var showId = req.params.show;
		console.log(showId);
		Show.findOne({id: showId}, function(err,doc) {
			if (err){
				res.status(500).json(err)
			}
			doc.remove();
			res.json({msg: 'document was removed'});
		})
	})







};
