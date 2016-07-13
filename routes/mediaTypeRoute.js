var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var MediaType = require('../models/MediaType.js');

// GET: /api/mediatype 
router.get('/', function(req, res, next) {
  console.log("Accessed GET: /api/mediatype");
  MediaType.find(function (err, mediatypes) {
  	var formattedMediaTypes = [];
  	
  	mediatypes.forEach((type) => {
  		var newType = {
  			IdMediaType: type.IdMediaType,
  			Name: type.Name,
  			ColorName: type.ColorName,
  			ColorLight: type.ColorLight,
  			ColorDark: type.ColorDark
  		};
  		formattedMediaTypes.push(newType);
  	});

    if (err) return next(err);
    res.json(formattedMediaTypes);
  });
});

module.exports = router;
