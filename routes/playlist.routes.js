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


router.post("/postplaylist", postplaylist)
router.patch("/updateplaylist/:id",updateplaylist);
router.delete("/deleteplaylist",deleteplaylist);
router.post("/addsongtoplaylist/:id", addsongtoplaylist)
router.post("/removesong/:id", removesong)

export default router;