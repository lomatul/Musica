import mongoose from "mongoose";

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
  playlistname:{
    type:[String ],
    default:'',
  },
  songpath: {
  type: String,
  }

  
});

export default  mongoose.model("Song", SongSchema);