import express from "express";
const router = express.Router();
import {
    postLogin,
    postRegister, 
    updateProfile,
    getProfileInfos,
    deleteProfile,
    logout,
    getCallback,
    getScope,
    getProfile,
    AdminRegister,
    AdminLogin,
    postProfileImage,
    getOTP,
    newpasswordcreate
    } from "../controllers/auth.controllers.js";

import {
    uploadProfileImage, 
    } from "../middlewares/multer.middleware.js";

    

router.post("/login", postLogin)
router.post("/adminlogin", AdminLogin)
router.post("/register", postRegister);
router.post("/adminregister", AdminRegister);
router.get("/logout", logout);
router.post("/getOTP",getOTP);
router.post("/newpasswordcreate",newpasswordcreate);
router.get("/profiles", getProfileInfos);
router.get("/profiles/:id", getProfile);
router.patch("/updateprofile/:id",  updateProfile);
router.delete("/deleteprofile/:id", deleteProfile);

router.post('/upload/postProfileImage', uploadProfileImage.single('file'), postProfileImage);

router.get("/auth/google", getScope);
router.get("/google/callback",getCallback);



export default router;