import express from "express";
const router = express.Router();
import {
    postPlaylistIcon,
    playlistsongs,
    getplaylist,
    postplaylist,
    updateplaylist,
    deleteplaylist,
    addsongtoplaylist,
    removesong,

    } from "../controllers/playlist.controllers.js";

    import {
        uploadPlaylisticon, 
        } from "../middlewares/multer.middleware.js";
    
    
        
router.post("/postplaylist", postplaylist)
router.get("/getplaylist/:id", getplaylist)
router.get("/playlistsongs/:id", playlistsongs)
router.patch("/updateplaylist/:id",updateplaylist);
router.delete("/deleteplaylist",deleteplaylist);
router.post("/addsongtoplaylist/:id", addsongtoplaylist)
router.delete("/removesong/:id", removesong)

router.post('/upload/postPlaylistIcon/:id', uploadPlaylisticon.single('file'), postPlaylistIcon);

export default router;