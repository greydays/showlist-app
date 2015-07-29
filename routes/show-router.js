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
	})
};
