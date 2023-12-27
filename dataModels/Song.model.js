const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  
  songname: {
    type: String,
    required: true,
  },
  artistname: {
    type: String,
  },
  genre: {
    type: String,
    required: true,
  },
  songtype: {
    type: String,
    default:'MP3',
  },
  playlistname:{
    type:String,
    default:'',
  }

  
});

const Song = mongoose.model("Song", SongSchema);
module.exports = Song;