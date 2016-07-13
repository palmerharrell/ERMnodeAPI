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
  console.log("Accessed /api/mediaitem");
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
  					IdAppUser: item.IdAppUser,
  					Name: item.Name,
  					Recommender: item.Recommender,
  					Notes: item.Notes,
  					Finished: item.Finished,
  					Favorite: item.Favorite,
  					Type: typeName,
  					Rating: item.Rating
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

// POSTING EXAMPLE WITH *AUTO-INCREMENT*
// MediaItem.create(
// 	{
// 		IdMediaType: 3, 
// 		IdAppUser: 14,
// 		Name: 'TEST 2 after counter reset',
// 		Recommender: 'Laura',
// 		Notes: 'Testing... 2003! woohoo',
// 		Finished: true,
// 		Favorite: false,
// 		Rating: 0
// 	}, 
// 	function(err, mediaitem){
//   	if(err) console.log(err);
//   	else console.log(mediaitem);
// 	}
// );
// END SAMPLE DATA POST


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// TODO:


// DELETE: api/mediaitem?userid=1&itemid=6
// PUT: api/mediaitem?userid=12

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




module.exports = router;
