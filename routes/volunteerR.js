import express from "express";
import { authVolunteer } from "../middlewares/authVerify.js";

import {
  signup,
  login,
  registerEvent,
  uploadNormalPhoto,
  updateNormalPhoto,
  checkHours,
} from "../controllers/volunteerC.js";

import { uploadPassport, uploadNormal } from "../middlewares/multer.js";

const router = express.Router();

router.post("/signup", uploadPassport.single("passport"), signup);
router.post("/login", login);
router.post("/events/:eventId/register", authVolunteer, registerEvent);

router.post(
  "/upload-normalPhoto",
  uploadNormal.single("image"),
  authVolunteer,
  uploadNormalPhoto
);

router.post(
  "/update-normalPhoto",
  uploadNormal.single("image"),
  authVolunteer,
  updateNormalPhoto
);

router.get("/checkHours", authVolunteer, checkHours);

export default router;
