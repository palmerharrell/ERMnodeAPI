var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var AppUser = require('../models/AppUser.js');

// GET: /api/appuser
// GET: api/appuser?username=githubAlias
router.get('/', function(req, res, next) {
  console.log("Accessed GET: /api/appuser");
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
	  		if (err) return next(err);
  			if (requestedUser !== null) {
	  			var formattedUser = [{
	  				IdAppUser: requestedUser.IdAppUser,
	  				Username: requestedUser.Username,
	  				Email: requestedUser.Email,
	  				MediaItems: null
	  			}];
	  			res.json(formattedUser);
	  		} else {
	  			res.json({Error: 'Requested user not found'});
	  		}
  	});
  }
});

// POST: api/appuser
// Expected req.body: {"Username" : "githubAlias", "Email" : null}
router.post('/', function(req, res, next) {
	console.log("Accessed POST: /api/appuser");
	AppUser.findOne({Username: req.body.Username}, 
  		function(err, requestedUser) { 
  			if (err) return next(err);
  			if (requestedUser === null) {
  				var newUser = {
  					Username: req.body.Username,
  					Email: req.body.Email,
  					MediaItems: null
  				};
  				AppUser.create(newUser, function(err, user) {
  					if (err) return next(err);
  					var formattedUser = {
  						IdAppUser: user.IdAppUser,
  						Username: user.Username,
  						Email: user.Email,
  						MediaItems: null
  					};
	  				res.status(201).json(formattedUser);
  				});
	  		} else {
	  			res.status(409).send(); // Conflict (User already exists)
	  		}
  	});
});

module.exports = router;
