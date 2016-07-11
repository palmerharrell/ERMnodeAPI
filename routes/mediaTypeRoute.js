var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var MediaType = require('../models/MediaType.js');

/* GET /api/mediatype listing. */
router.get('/', function(req, res, next) {
  MediaType.find(function (err, mediatypes) {
  	console.log("Reached /api/mediatype");
    if (err) return next(err);
    res.json(mediatypes);
  });
});

module.exports = router;
