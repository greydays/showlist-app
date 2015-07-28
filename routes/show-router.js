'use strict';

var mongoose = require('mongoose');
var Show = require('../models/show');
var Venue = require('../models/Venue');
var eatAuth = require('../lib/eat-auth')(process.env.APP_SECRET);


module.exports = function(router) {
  router.route('/shows')
	.get(function(req,res) {
		Show.find({}, function(err,data) {
			console.log('shows router hit')
			if (err) {
				res.status(500).json({msg: 'Internal Server Error'})
			}
			res.json(data)
			console.log(data)
		})
	})

	.post(eatAuth, function(req,res) {
    var show = new Show(req.body);
		console.log(req.body);
		console.log(show);
		show.save(function(err,data) {
			if (err) {
				res.status(500).json({msg: 'internal server error'})
			}
			console.log(data)
			res.json({msg: 'New show has been saved!'})
		}) 
	})

	.delete(eatAuth, function(req,res) {
		Show.remove({}, function(err,data) {
			if (err) {
				res.status(500).json({msg: 'Internal Server Error'})
			}
			res.json({msg: 'shows have been deleted'})
		//this route deletes ALL SHOWS use with caution

		})
	})
  
  router.route('/:venue/shows')
  .get(function(req,res) {
  	var venueName = req.params.venue;
  	Venue.findOne({name: venueName})
  	.populate('Shows')
  	.exec(function(err,doc) {
  		res.json(doc);
  	})
  })

  .post(eatAuth, function(req, res) {
  	var show = new Show(req.body)
  	show.save(function(err,data) {
  		if (err) {
  			res.status(500).json({msg: 'Internal server error'})
  		}
  		Venue.findById(show.venue, function(err,venue) {
  			if(err) {
  				res.status(500).json(err);
  			}
  			venue.shows.push(data)
  			user.save(function(err,data) {
  				if(err) {
  					res.status(500).json(err)
  				}
  				res.json(data)
  				console.log(data);
  			})
  		})
  	})


  })

  router.route('/:venue/shows/:show')
  .get(function(req,res) {
  	var venueName = req.params.venue;
  	var showName = req.params.show;
  	Venue.findOne()
  })

}
