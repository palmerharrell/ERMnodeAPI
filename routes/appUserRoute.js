var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var AppUser = require('../models/AppUser.js');

// // TEST POST
// AppUser.create(
// 	{
// 		IdAppUser: 14, 
// 		Username: 'palmerharrell', 
// 		Email: null
// 	}, 
// 	function(err, appuser){
//   	if(err) console.log(err);
//   	else console.log(appuser);
// 	}
// );
// // END TEST POST


// GET /api/appuser
router.get('/', function(req, res, next) {
  AppUser.find(function (err, appusers) {
  	console.log("Reached /api/appuser");
  	var formattedAppUsers = [];

  	appusers.forEach((user) => {
  		var newUser = {
  			IdAppUser: user.IdAppUser,
  			Username: user.Username,
  			Email: user.Email,
  			MediaItems: null
  		};
  		formattedAppUsers.push(newUser);
  	});

    if (err) return next(err);
    res.json(formattedAppUsers);
  });
});

module.exports = router;
