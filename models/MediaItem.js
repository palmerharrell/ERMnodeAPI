var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var MediaItemSchema = new mongoose.Schema({
  IdMediaItem: Number,
  IdMediaType: Number,
  IdAppUser: Number,
  Name: String,
  Recommender: String,
  Notes: String,
  Finished: Boolean,
  Favorite: Boolean,
  Rating: Number,
  DateAdded: { type: Date, default: Date.now },
});

MediaItemSchema.plugin(autoIncrement.plugin, { 
	model: 'MediaItem', 
	field: 'IdMediaItem',
	startAt: 2001,
	incrementBy: 1
});

module.exports = mongoose.model('MediaItem', MediaItemSchema);
