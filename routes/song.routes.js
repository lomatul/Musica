import express from "express";


const router = express.Router();
import {
    postSongFile,getsong , updatesong, deletesong, 
    } from "../controllers/song.controllers.js";
import {
    uploadAudioFile, 
} from "../middlewares/multer.middleware.js";


router.post("/postSong", uploadAudioFile.single('file') , postSongFile);
// router.get("/getsong", getsong);
router.patch("/updatesong/:id", updatesong);
router.delete ("/deletesong/:id",deletesong);



export default router;