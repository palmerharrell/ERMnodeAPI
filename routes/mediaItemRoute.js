var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var MediaItem = require('../models/MediaItem.js');

// TEST (gets all mediaitems)
// GET: /api/mediaitem
router.get('/', function(req, res, next) {
  MediaItem.find(function (err, mediaitems) {
  	console.log("Reached /api/mediaitem");
    if (err) return next(err);
    res.json(mediaitems);
  });
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

// GET: api/mediaitem?userid=2
// POST: api/mediaitem
// DELETE: api/mediaitem?userid=1&itemid=6
// PUT: api/mediaitem?userid=12

// Maybe, check frontend:
// GET: api/mediaitem/5 (specific mediaItem by id)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




module.exports = router;
