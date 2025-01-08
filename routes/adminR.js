import express from "express";
import {
  getVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  createEvent,
  login,
  getVolunteersByEvent,
} from "../controllers/adminC.js";

import { authAdmin } from "../middlewares/authVerify.js";

const router = express.Router();

router.post("/login", login);
router.get("/", getVolunteers);
router.get("/:id", getVolunteerById);
router.patch("/:id", authAdmin, updateVolunteer);
router.delete("/:id", authAdmin, deleteVolunteer);
router.post("/createEvent", authAdmin, createEvent);
router.get("/events/:eventId/volunteers", authAdmin, getVolunteersByEvent);

export default router;
