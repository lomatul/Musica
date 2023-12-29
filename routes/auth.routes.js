import express from "express";
const router = express.Router();
import {
    postLogin,
    postRegister, 
    updateProfile,
    getProfileInfos,
    deleteProfile,
    logout,
    } from "../controllers/auth.controllers.js";


router.post("/login", postLogin)
router.post("/register", postRegister);
router.get("/logout", logout);

router.get("/profiles", getProfileInfos);
router.patch("/update-profile",  updateProfile);
router.delete("/delete-profile/:id", deleteProfile);



export default router;