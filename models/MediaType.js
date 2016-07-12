var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var MediaTypeSchema = new mongoose.Schema({
  IdMediaType: Number,
  Name: String,
  ColorName: String,
  ColorLight: String,
  ColorDark: String
});

MediaTypeSchema.plugin(autoIncrement.plugin, { 
	model: 'MediaType', 
	field: 'IdMediaType',
	startAt: 21,
	incrementBy: 1
});

module.exports = mongoose.model('MediaType', MediaTypeSchema);



// C# Model:

	// public class MediaType
	//   {
	//     [Key]
	//     public int IdMediaType { get; set; }
	//     public string Name { get; set; }
	//     public string ColorName { get; set; }
	//     public string ColorLight { get; set; }
	//     public string ColorDark { get; set; }

	//     // For Foreign Keys:
	//     public ICollection<MediaItem> MediaItems { get; set; }
	//   }