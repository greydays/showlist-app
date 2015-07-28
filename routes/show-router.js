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
      //route gets all shows
		});
	})

	.post(eatAuth, function(req,res) {
    var show = new Show(req.body);
		console.log(req.body);
		console.log(show);
		show.save(function(err,data) {
			if (err) {
				res.status(500).json({msg: 'internal server error'})
			}
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
		});
	})
  
  router.route('/:venue/shows')
  
  .get(function(req,res) {
  	var id = req.params.venue;
  	Venue.findById(id)
  	.populate('shows')
  	.exec(function(err,doc) {
    if(err) {
      res.status(500).json(err);
    } 
     
  		res.json(doc);
  	});
  })

  .post(eatAuth, function(req, res) {
  	var show = new Show(req.body)
    console.log(req.body)
  	show.save(function(err,data) {
  		if (err) {
  			res.status(500).json({msg: 'Internal server error'})
  		}
  		Venue.findById(show.venue, function(err,venue) {
  			if(err) {
  				res.status(500).json(err);
  			}
  			venue.shows.push(data)
  			venue.save(function(err,data) {
  				if(err) {
  					res.status(500).json(err)
  				}
  				res.json(data)
  				console.log(data);
  			});
  		});
  	});
  })

  router.route('/:venue/shows/:show')

  .get(function(req,res) {
    var id = req.params.venue;
    var showRequest = req.params.show;
    var showArray = [];
    Venue.findById(id)
    .populate('shows')
    .exec(function(err,doc) {
    if(err) {
      res.status(500).json(err);
    } 
     for(var i = 0; i < doc.shows.length; i ++) {
      if(doc.shows[i].showTitle === showRequest) {
        showArray.push(doc.shows[i])
      }
     }
      res.json(showArray);
    });
  })

  .delete(function(req,res) {
    var id = req.params.venue;
    var showRequest = req.params.show;
    var showArray = [];
    Venue.findById(id)
    .populate('shows')
    .exec(function(err,doc) {
    if(err) {
      res.status(500).json(err);
    } 
     console.log(doc.shows);
     for(var i = 0; i < doc.shows.length; i ++) {
      if(doc.shows[i].showTitle === showRequest) {
        Show.find({name: showRequest}).remove();
      }
     }
      res.json(showArray);
    });
  })

  .patch(function(req,res) {
    var showData = req.body;
    var id = req.params.venue;
    var showRequest = req.params.show;
    var showArray = [];
    Venue.findById(id)
    .populate('shows')
    .exec(function(err,doc) {
    if(err) {
      res.status(500).json(err);
    } 
     for(var i = 0; i < doc.shows.length; i ++) {
      if(doc.shows[i].showTitle === showRequest) {
        Show.findOneAndUpdate({name: showRequest}, showData, function(err,doc) {
          if(err) {
            res.status(500).json(err)
          }
          res.json(doc);
        });
      }
     }     
    });
  });
};
