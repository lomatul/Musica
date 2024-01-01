import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  profile_image: {
    type: String,
    default:'',
  }

  
});

export default  mongoose.model("Admin", AdminSchema);
