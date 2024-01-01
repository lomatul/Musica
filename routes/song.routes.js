import express from "express";


const router = express.Router();
import {
    postSongFile, updatesong, deletesong, searchResult
    } from "../controllers/song.controllers.js";
import {
    uploadAudioFile, 
} from "../middlewares/multer.middleware.js";


router.post("/postSong", uploadAudioFile.single('file') , postSongFile);
router.patch("/updatesong/:id", updatesong);
router.delete ("/deletesong/:id",deletesong);
router.get("/search", searchResult);




export default router;