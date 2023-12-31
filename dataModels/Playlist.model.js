import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema({

  playlistname: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    default:' ',
  },
  user:{
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

PlaylistSchema.index({playlistname: 'text' })
export default mongoose.model("Playlist", PlaylistSchema);