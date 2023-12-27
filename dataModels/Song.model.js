const mongoose = require("mongoose");

const musicplayerSchema = new mongoose.Schema({
 
  project_name: {
    type: String,
    default:'',
  },
 
  description:{
    type: String,
    default:' ',
  },

  user_name:{
    type: String,
  },

  profile_image: {
    type: String,
    default:'',
  },
  images: {
    type: [String],
    default:[],
  },
  audio: {
    type: String,
    default:'',
  },
  audios: {
    type: [String],
    default:[],
  },

  
});

const project = mongoose.model("project", projectSchema);
module.exports = project;