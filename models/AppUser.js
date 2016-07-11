var mongoose = require('mongoose');

var AppUserSchema = new mongoose.Schema({
  IdAppUser: Number,
  Username: String,
  Email: String
});

module.exports = mongoose.model('AppUser', AppUserSchema);



// C# Model:

  // public class AppUser
  // {
  //   [Key]
  //   public int IdAppUser { get; set; }
  //   public string Username { get; set; }
  //   public string Email { get; set; }

  //   // For Foreign Keys:
  //   public ICollection<MediaItem> MediaItems { get; set; }
  // }
  