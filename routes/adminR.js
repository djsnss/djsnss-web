import express from "express";
import {
  getVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  createEvent,
  login,
  getVolunteersByEvent,
  removeVolunteerFromEvent,
  updateVolunteerHours,
  getEventStats,
  getAttendanceList,
  changeEmail,
  changePassword,
  sendOtpForPasswordChange,
  logout,
  getEventById,
  getAllEvents,
  updateEventDetails,
  deleteEvent,
  forgotPassword,
  resetPassword,
  verifyToken,
} from "../controllers/adminC.js";

import { authAdmin } from "../middlewares/authVerify.js";

import { uploadNormal } from "../middlewares/multer.js";
import { otpLimiter, passwordLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/login", login);
router.get("/getAllVolunteers", getVolunteers);
router.get("/getVolunteer/:id", getVolunteerById);
router.patch("/updateVolunteer/:id", authAdmin, updateVolunteer);
router.delete("/deleteVolunteer/:id", authAdmin, deleteVolunteer);

// Event routes
router.post(
  "/createEvent",
  authAdmin,
  uploadNormal.single("photo"),
  createEvent
);
router.get("/:eventId/volunteers", authAdmin, getVolunteersByEvent);
router.get("/event/:eventId", authAdmin, getEventById);
router.get("/getAllEvents", authAdmin, getAllEvents);
router.delete(
  "/:eventId/volunteers/:volunteerId",
  authAdmin,
  removeVolunteerFromEvent
);
router.post("/updateHours", authAdmin, updateVolunteerHours);
router.get("/:eventId/stats", authAdmin, getEventStats);
router.put(
  "/updateEvent/:eventId",
  authAdmin,
  uploadNormal.single("photo"),
  updateEventDetails
);
router.get("/getAttendanceList/:eventId", authAdmin, getAttendanceList);

router.put("/change-email", authAdmin, changeEmail);
router.post("/send-otp", authAdmin, otpLimiter, sendOtpForPasswordChange);
router.put("/change-password", authAdmin, passwordLimiter, changePassword);
router.post("/forgot-password", otpLimiter, forgotPassword);
router.post("/reset-password", passwordLimiter, resetPassword);
router.post("/logout", authAdmin, logout);
router.delete("/deleteEvent/:eventId", authAdmin, deleteEvent);
router.get("/verify-token", verifyToken);

export default router;
