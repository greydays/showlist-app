'use strict';

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Venue = require('../models/Venue');
var eatAuth = require('../lib/eat-auth')(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyParser.json());

  router.post('/', eatAuth, function(req, res) {
    var venue = new Venue(req.body);
    venue.save(function(err,data) {
      if (err) {
        res.status(500).json(err)
      }
      res.json(data);
    })
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

  .put(eatAuth, function(req, res) {
    var venueName = req.params.venue;
    var newVenueInfo = req.body;
    Venue.update({name: venueName}, newVenueInfo, function(err, venue) {
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

  .delete(eatAuth, function(req, res) {
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
    });
  });

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
        res.status(500).json(err)
      }
      if(!data) {
        res.status(404).json(err)
      }
      Venue.findById(show.venue, function(err,venue) {
        if(err) {
          res.status(500).json(err);
        }
        if(!venue) {
          res.status(404).json(err);
        }
        venue.shows.push(data)
        venue.save(function(err,data) {
          if(err) {
            res.status(500).json(err)
          }
          res.json(data)
        })
      })
    })
  });
    

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



  .patch(eatAuth, function(req,res) {
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

  .delete(eatAuth, function(req,res) {
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
        Show.find({name: showRequest}).remove(function(err,doc) {
          if(err) {
            res.status(500).json(err);
          }
          res.json(doc.name + ' has been deleted')
        });
      }
     }
    })
  })
};
