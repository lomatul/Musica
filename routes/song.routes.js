import express from "express";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();
import {
    postSongFile, updatesong, deletesong, searchResult,searchbyartist
    } from "../controllers/song.controllers.js";
import {
    uploadAudioFile, 
} from "../middlewares/multer.middleware.js";


router.post("/postSong", uploadAudioFile.single('file') , postSongFile);
router.patch("/updatesong/:id", ensureAuthenticated, updatesong);
router.delete ("/deletesong/:id",deletesong);
router.get("/search", searchResult);
router.get("/searchartist", searchbyartist);



export default router;