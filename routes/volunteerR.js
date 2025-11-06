import express from "express";
import { authVolunteer } from "../middlewares/authVerify.js";
import { addVolunteerFeedback, getVolunteerFeedback, deleteFeedback } from "../controllers/feedbackC.js";

import {
  signup,
  login,
  registerEvent,
  uploadNormalPhoto,
  updateNormalPhoto,
  checkHours,
  changePassword,
  sendOtpForPasswordChange,
  logout,
  verifyToken,
} from "../controllers/volunteerC.js";

import { uploadNormal } from "../middlewares/multer.js";

const router = express.Router();

router.post("/signup", uploadNormal.single("passport"), signup); //volunteer registration
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

router.post("/send-otp", sendOtpForPasswordChange); //route to get otp for password change

router.put("/change-password", changePassword); //route to change password of volunteer

router.post("/logout", authVolunteer, logout); //logout API for volunteer

router.get("/verify-token", verifyToken);

// Volunteer feedback routes
router.post(
  "/events/:eventId/feedback", 
  authVolunteer, 
  addVolunteerFeedback
); // Submit or update feedback

router.delete(
  "/events/:eventId/feedback/:feedbackId",
  authVolunteer,
  deleteFeedback
);

export default router;
