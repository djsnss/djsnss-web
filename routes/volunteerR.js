import express from "express";
import { authVolunteer } from "../middlewares/authVerify.js";


import {
  signup,
  login,
  registerEvent,
  uploadNormalPhoto,
  updateNormalPhoto,
  checkHours,
  getEventById,
} from "../controllers/volunteerC.js";

import { uploadPassport, uploadNormal } from "../middlewares/multer.js";

const router = express.Router();

router.post("/signup", uploadPassport.single("passport"), signup); //volunteer registration
router.post("/login", login); //volunteer login
router.post("/events/:eventId/register", authVolunteer, registerEvent); //register volunteer for a particular event

router.post(
  "/upload-normalPhoto",
  uploadNormal.single("image"),
  authVolunteer,
  uploadNormalPhoto
); //upload normal photo(profile photo) of volunteer

router.post(
  "/update-normalPhoto",
  uploadNormal.single("image"),
  authVolunteer,
  updateNormalPhoto
); //update normal photo(profile photo) of volunteer

router.get("/checkHours", authVolunteer, checkHours); //Check number of volunteered hours

router.get("/getEvent/:eventId", authVolunteer, getEventById); //Get event by ID

export default router;
