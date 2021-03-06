var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var AppUserSchema = new mongoose.Schema({
  IdAppUser: Number,
  Username: String,
  Email: String
});

AppUserSchema.plugin(autoIncrement.plugin, { 
	model: 'AppUser', 
	field: 'IdAppUser',
	startAt: 1001,
	incrementBy: 1
});

module.exports = mongoose.model('AppUser', AppUserSchema);
