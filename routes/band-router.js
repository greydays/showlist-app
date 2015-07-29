var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Band = require('../models/band');

module.exports = function(router) {
	router.route('/bands')
  .get(function(req,res) {
  	Band.find({}, function(err,bands) {
  		if (err) {
  			res.status(500).json({msg: 'Internal Server error'})
  		}
      if (!bands) {
        res.status(404).json({msg: 'bands not found'})
      }
  		res.json(bands);
  	});
  })

  .post(function(req,res) {
  	var band = new Band(req.body);
  	band.save(function(err,data) {
  		if(err) {
  			res.status(500).json({msg: 'Internal Server Error'})
  		}
      if(!data) {
        res.status(404).json({msg: 'band not found'})
      }
  		res.json({msg: 'Your band ' + band.name + ' has ben saved!'})
  	});
  });

	router.route('/band/:band')
	.get(function(req,res) {
		var band = req.params.band;
		Band.findOne({name: band}, function(err, doc) {
			if (err) {
				res.status(500).json(err)
			}
      if (!doc) {
        res.status(404).json({msg: 'error, band not found'})
      }
			res.json(doc);
		});
	})

  .put(function(req,res) {
    var bandData = req.body;
    Band.findOneAndUpdate({name: bandData.name}, bandData, function(err,doc) {
    	if (err) {
    		res.status(500).json(err)
    	}
      if (!doc) {
        res.status(404).json({msg: 'error, file not found'})
      }
    	res.json(doc);
    });
  })

  .delete(function(req,res) {
  	var band = req.params.band;
  	Band.remove({name: band}, function(err,data) {
  		if (err) {
  			res.status(500).json(err)
  		}
      if (!data) {
        res.status(500).json({msg: 'band was not found'})
      }
  		res.json({msg: data.name + ' was deleted'});
  	});
  })

  router.route('/band/:band/shows')
  .get(function(err,res) {
  	var band = req.params.band;
  	Band.findOne({name: band}).populate('shows').exec(function(err,doc) {
  		if (err) {
  			res.status(500).json({msg: 'Internal server errror'})
  		}
  		if(!err) {
  			res.status(404).json({msg: 'Error, Band not found'})
  		}
  		res.json(doc.shows);
  	});
  })
  .post(function(req,res) {
  	var showData = req.body;
  	var show = new Show(showData)
  	show.save(function(err,doc) {
  		if (err) {
  			res.status(500).json(err)
  		}
  		if(!doc) {
  			res.status(404).json(err + ' band not found')
  		}
      Band.findById(show.band, function(err,band) {
      	if (err) {
      		res.status(500).json(err)
      	}
        band.shows.push(show.id);
        res.json({msg: 'show saved!'})
      });
  	});
  });

  router.route('/band/:band/shows/:show')
  
  .get(function(req,res) {
  	var bandName = req.params.band;
  	var showName = req.params.show;
  	var showArray = [];

  	Band.findOne({name: bandName}, function(err,doc) {
  		if(err) {
  			res.status(500).json(err);
  		}
  		if(!doc) {
  			res.status(404).json({msg: 'error, band not found'})
  		}
  		doc.populate('shows').exec(function(err, data) {
  			if (err) {
  				res.status(500).json(err)
  			}
  			if(!doc) {
  				res.status(404).json(err)
  			}
  			for (var i = 0; i < data.shows.length; i ++) {
  				if(data.shows[i].name === showName) {
  					showArray.push(data.shows[i]);
  				}
  			}
  		});
  		res.json(showArray);
  	});
  })

  .put(function(req,res) {
  	var bandName = req.params.band;
  	var showName = req.params.show;
  	var showData = req.body;
  	
  	Band.findOne({name: bandName}, function(err,doc) {
  		if(err) {
  			res.status(500).json(err);
  		}
  		if(!doc) {
  			res.status(404).json({msg: 'error, band not found'})
  		}
  		doc.populate('shows').exec(function(err, data) {
  			if (err) {
  				res.status(500).json(err)
  			}
  			if(!doc) {
  				res.status(404).json(err)
  			}
  			for (var i = 0; i < data.shows.length; i ++) {
  				if(data.shows[i].name === showName) {
  					Show.findOneAndUpdate({name: data.shows[i].name}, showData, function(err,show) {
  						if (err) {
  							res.status(500).json(err)
  						}
  						res.json({msg: show.name + ' was updated'})
  					});
  				}
  			}
  		}); 		
  	});
  })

  .delete(function(req,res) {
  	var bandName = req.params.band;
  	var showName = req.params.show;
  	
  	Band.findOne({name: bandName}, function(err,doc) {
  		if(err) {
  			res.status(500).json(err);
  		}
  		if(!doc) {
  			res.status(404).json({msg: 'error, band not found'})
  		}
  		doc.populate('shows').exec(function(err, data) {
  			if (err) {
  				res.status(500).json(err)
  			}
  			if(!doc) {
  				res.status(404).json(err)
  			}
  			for (var i = 0; i < data.shows.length; i ++) {
  				if(data.shows[i].name === showName) {
  					Show.remove(data.shows[i].name, function(err,show) {
  						if (err) {
  							res.status(500).json(err)
  						}
  						res.json({msg: show.name + ' was deleted'})
  					});
  				}
  			}
  		});
  	});
  });
}






  
