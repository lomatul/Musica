import express from "express";


const router = express.Router();
import {
    postSongFile,
    } from "../controllers/song.controllers.js";
import {
    uploadAudioFile,
} from "../middlewares/multer.middleware.js";


router.post("/postSong", uploadAudioFile.single('file') , postSongFile);




export default router;