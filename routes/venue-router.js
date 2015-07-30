'use strict';

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Venue = require('../models/Venue');
var Show = require('../models/show')
var Band = require('../models/band')
var eatAuth = require('../lib/eat-auth')(process.env.APP_SECRET);
// var validator = require('validator')

module.exports = function(router) {
  router.use(bodyParser.json());

  router.post('/',  function(req, res) {
    var venue = new Venue(req.body);
    var userName = req.body.userName;
    if (/\s/.test(userName)) {
      res.status(405).json({msg: 'No spaces allowed in user name'})
    }
    venue.basic.password = venue.generateHash(req.body.basic.password);
    venue.save(function(err,data) {
      if (err) {
        console.log(err);
        res.status(500).json(err)
      }
      res.json(data);
    })
  });

  router.route('/venue-view')

  .get(eatAuth, function(req, res) {
    console.log('hit get route');
    var name = req.venue.userName;
    Venue.findOne({userName: name}, function(err, venue) {
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
    var name = req.params.venue;
    var newVenueInfo = req.body;
    Venue.update({userName: name}, newVenueInfo, function(err, venue) {
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
    var name = req.params.venue;
    Venue.findOne({userName: name}, function(err, venue) {
      if (err) {
        return res.status(500).json({msg: err});
      }
      if (venue) {
        venue.remove();
        res.json({msg: venue.name + ' was deleted'});
      } else {
        res.status(404).json({msg: 'Unable to locate ' + venue.name});
      }
    });
  });

  router.route('/:venue/shows')

  .get(function(req,res) {
    var name = req.params.venue;
    Venue.findOne({userName: name})
    .populate('shows')
    .exec(function(err,doc) {
    if(err) {
      res.status(500).json(err);
    }
    if (!doc) {
      res.status(404).json({msg: 'Venue not found'})
    }
      res.json(doc);
    });
  })

  router.route('/new-show')
  .post(eatAuth, function(req, res) {
    var name = req.venue.userName;
    var show = new Show(req.body)
    show.venue = req.venue._id;
    console.log(show)
    show.save(function(err,data) {
      if (err) {
        res.status(500).json(err)
      }
      if(!data) {
        res.status(404).json(err)
      }
      Venue.findOne({userName: name}, function(err,venue) {
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
    var name = req.params.venue;
    var showRequest = req.params.show;
    var showArray = [];
    Venue.findOne({userName: name})
    .populate('shows')
    .exec(function(err,doc) {
    if(err) {
      res.status(500).json(err);
    }
    if(!doc) {
      res.status(404).json({msg: 'show not found'})
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
    var name = req.params.venue;
    var showRequest = req.params.show;
    var showArray = [];
    Venue.findOne({userName: name})
    .populate('shows')
    .exec(function(err,doc) {
    if(err) {
      res.status(500).json(err);
    }
    if(!doc) {
      res.status(404).json({msg: 'Show not found'})
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
  })

  .delete(eatAuth, function(req,res) {
    var name = req.params.venue;
    var showRequest = req.params.show;
    var showArray = [];
    Venue.findByName({userName: name})
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

router.route('/bands')
  .post(function(req,res) {
    console.log(req.body)
    var band = new Band(req.body);
    band.save(function(err,data) {
      if(err) {
        console.log(err)
        res.status(500).json(err)
      }
      res.json({msg: 'band saved'})
    })
  })
};
