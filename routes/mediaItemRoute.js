var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var MediaItem = require('../models/MediaItem.js');


// TEST POST
// MediaItem.create(
// 	{
// 		IdMediaItem: 111, 
// 		IdMediaType: 1, 
// 		IdAppUser: 11, 
// 		Name: 'Test item 1', 
// 		Recommender: 'Tom', 
// 		Notes: 'This was posted via mediaItemRoute.js',
// 		Finished: false,
// 		Favorite: false,
// 		Rating: 0
// 	}, 
// 	function(err, todo){
//   	if(err) console.log(err);
//   	else console.log(todo);
// 	}
// );
// END TEST POST

/* GET /mediaitem listing. */
router.get('/', function(req, res, next) {
  MediaItem.find(function (err, mediaitems) {
  	console.log("Reached /mediaitem");
    if (err) return next(err);
    res.json(mediaitems);
  });
});

module.exports = router;