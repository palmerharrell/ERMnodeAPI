var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var MediaItem = require('../models/MediaItem.js');
var MediaType = require('../models/MediaType.js');

var typeNames = [];

function getTypesQuery(){
	var query = MediaType.find({});
	return query;
}

var query = getTypesQuery();
query.exec(function(err, types) {
	if (err) return console.log(err);
	typeNames = types;
})

// GET: api/mediaitem?userid=2
router.get('/', function(req, res, next) {
  console.log("Accessed GET: /api/mediaitem");
  if (req.query.userid === undefined) {
  	res.json({Error: 'No userId provided'});
  } else {
  	console.log("userid submitted: ", req.query.userid);
  	MediaItem.find({IdAppUser: req.query.userid},
  		function(err, mediaItems) {
  			var formattedMediaItems = [];
  			mediaItems.forEach((item) => {
  				var typeIndex = typeNames.map(function(type) { 
  					return type.IdMediaType; 
  				}).indexOf(item.IdMediaType);
  				var typeName = typeNames[typeIndex].Name;
  				var singleItem = {
  					IdMediaItem: item.IdMediaItem,
  					IdMediaType: item.IdMediaType,
  					// IdAppUser: item.IdAppUser,
  					Name: item.Name,
  					Recommender: item.Recommender,
  					Notes: item.Notes,
  					Finished: item.Finished,
  					Favorite: item.Favorite,
  					Type: typeName,
  					Rating: item.Rating,
  					DateAdded: item.DateAdded
  				};
  				formattedMediaItems.push(singleItem);
  			});
  			if (err) return next(err);
  			if (formattedMediaItems.length === 0) {
  				res.json({
  					message: 'User has not created any items or user does not exist'
  				});
  			} else {
  				res.json(formattedMediaItems);
  			}
  		});
  }
});

// POST: api/mediaitem
router.post('/', function(req, res, next) {
	console.log("Accessed POST: /api/mediaitem");
	MediaItem.create(
	{
		IdMediaType: req.body.IdMediaType,
		IdAppUser: req.body.IdAppUser,
		Name: req.body.Name,
		Recommender: req.body.Recommender,
		Notes: req.body.Notes,
		Finished: req.body.Finished,
		Favorite: req.body.Favorite,
		Rating: req.body.Rating
	},
	function(err, mediaitem){
		if (err) return next(err);
		var formattedItem = {
			IdMediaItem: mediaitem.IdMediaItem,
			IdMediaType: mediaitem.IdMediaType,
			IdAppUser: mediaitem.IdAppUser,
			Name: mediaitem.Name,
			Recommender: mediaitem.Recommender,
			Notes: mediaitem.Notes,
			Finished: mediaitem.Finished,
			Favorite: mediaitem.Favorite,
			Rating: mediaitem.Rating,
			DateAdded: mediaitem.DateAdded,
			MediaType: null,
			AppUser: null
		};
		res.status(201).json(formattedItem);
	})
});

// DELETE: api/mediaitem?userid=1&itemid=6
router.delete('/', function(req, res, next) {
	console.log("Accessed DELETE: /api/mediaitem");
	MediaItem.findOne({IdMediaItem: req.query.itemid},
		function(err, mediaitem) {
			if (err) return next(err);
			if (mediaitem.IdAppUser == req.query.userid) {
				MediaItem.remove({IdMediaItem: req.query.itemid},
					function(err, itemToRemove) {
						if (err) return next(err);
						res.json(mediaitem);
					});
			} else {
				res.status(404).send();
			};
		});
});

// PUT: api/mediaitem?userid=12
router.put('/', function(req, res, next) {
	console.log("Accessed PUT: /api/mediaitem");
	console.log("** req.body.IdMediaItem: ", req.body.IdMediaItem); // TEST
	MediaItem.findOne({IdMediaItem: req.body.IdMediaItem},
		function(err, mediaitem) {
			if (err) return next(err);
			if (mediaitem.IdAppUser == req.query.userid) {
				MediaItem.findByIdAndUpdate(mediaitem._id, req.body,
					function(err, item) {
						if (err) return next(err);
						res.json({successMessage: "Record successfully updated."});
					});
			} else {
				res.json({errorMessage: "This user does not have permission to alter this record."});
			}
		});
});

module.exports = router;
