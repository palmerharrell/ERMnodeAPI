var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var MediaItem = require('../models/MediaItem.js');

// TEST (gets all mediaitems)
// GET: /api/mediaitem
// router.get('/', function(req, res, next) {
//   MediaItem.find(function (err, mediaitems) {
//   	console.log("Reached /api/mediaitem");
//     if (err) return next(err);
//     res.json(mediaitems);
//   });
// });

// GET: api/mediaitem?userid=2
router.get('/', function(req, res, next) {
  console.log("Accessed /api/mediaitem");
  if (req.query.userid === undefined) {
  	if (err) return next(err);
  	res.json({Error: 'No userId provided'});
  } else {
  	console.log("userid submitted: ", req.query.userid);
  	MediaItem.find({IdAppUser: req.query.userid},
  		function(err, mediaItems) {
  			var formattedMediaItems = [];
  			mediaItems.forEach((item) => {
  				var singleItem = {
  					IdMediaType: item.IdMediaType,
  					IdAppUser: item.IdAppUser,
  					Name: item.Name,
  					Recommender: item.Recommender,
  					Notes: item.Notes,
  					Finished: item.Finished,
  					Favorite: item.Favorite,
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

// POST: api/mediaitem
// DELETE: api/mediaitem?userid=1&itemid=6
// PUT: api/mediaitem?userid=12

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




module.exports = router;
