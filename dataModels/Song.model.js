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
  songtype: {
    type: String,
    default:'MP3',
  },
  
});

SongSchema.index({songname: 'text' })
export default mongoose.model("Song", SongSchema);