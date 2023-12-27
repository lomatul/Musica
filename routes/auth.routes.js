import express from "express";
const router = express.Router();
import {
    postLogin,
    postRegister, 
    updateProfile,
    getProfileInfos,
    deleteProfile,
    } from "../controllers/auth.controllers.js";


router.post("/login", postLogin)
router.post("/register", postRegister);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.json({ error: err });
    } else res.redirect("/");
  });
});

router.get("/profiles", getProfileInfos);
router.patch("/update-profile",  updateProfile);
router.delete("/delete-profile/:id", deleteProfile);



export default router;