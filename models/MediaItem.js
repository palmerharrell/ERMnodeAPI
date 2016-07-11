var mongoose = require('mongoose');

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

module.exports = mongoose.model('MediaItem', MediaItemSchema);



// C# Model:

    // [Key]
    // public int IdMediaItem { get; set; }
    // public int IdMediaType { get; set; }
    // public int IdAppUser { get; set; }
    // public string Name { get; set; }
    // public string Recommender { get; set; }
    // public string Notes { get; set; }
    // public bool Finished { get; set; }
    // public bool Favorite { get; set; }
    // public int Rating { get; set; }
    // public DateTime DateAdded { get; set; }

    // // For Foreign Keys:
    // public MediaType MediaType { get; set; }
    // public AppUser AppUser { get; set; }