const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({

  playlistname: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    default:' ',
  },
  user_name:{
    type: String,
  },

  icon: {
    type: String,
    default:'',
  },
  numberofsongs: {
    type: String,
  },
  songs: {
    type: [String],
    default:[],
  },
  
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;