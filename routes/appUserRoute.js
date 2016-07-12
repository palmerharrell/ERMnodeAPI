var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var AppUser = require('../models/AppUser.js');

// GET: /api/appuser
// GET: api/appuser?username=githubAlias
router.get('/', function(req, res, next) {
  console.log("Accessed /api/appuser");
  if (req.query.username === undefined) {
  	console.log("No username provided. Returning all users.");
	  AppUser.find(function (err, appusers) {
	  	var formattedAppUsers = [];
	  	appusers.forEach((user) => {
	  		var singleUser = {
	  			IdAppUser: user.IdAppUser,
	  			Username: user.Username,
	  			Email: user.Email,
	  			MediaItems: null
	  		};
	  		formattedAppUsers.push(singleUser);
	  	});
	    if (err) return next(err);
	    res.json(formattedAppUsers);
	  });
  } else {
  	console.log("Username submitted: ", req.query.username);
  	AppUser.findOne({Username: req.query.username}, 
  		function(err, requestedUser) { 
  			if (requestedUser !== null) {
	  			var formattedUser = {
	  				IdAppUser: requestedUser.IdAppUser,
	  				Username: requestedUser.Username,
	  				Email: requestedUser.Email,
	  				MediaItems: null
	  			};
	  			if (err) return next(err);
	  			res.json(formattedUser);
	  		} else {
	  			if (err) return next(err);
	  			res.json({Error: 'Requested user not found'});
	  		}
  	});
  }
});




// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// TODO:
// POST: api/appuser

// Maybe, check frontend:
// GET: api/appuser/5 (specific appuser by id) 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

module.exports = router;
