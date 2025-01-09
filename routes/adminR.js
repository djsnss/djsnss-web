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
} from "../controllers/adminC.js";

import { authAdmin } from "../middlewares/authVerify.js";

const router = express.Router();

// Login route
router.post("/login", login);

// Volunteer routes
router.get("/", getVolunteers);  // Get all volunteers
router.get("/:id", getVolunteerById);  // Get a specific volunteer by ID
router.patch("/:id", authAdmin, updateVolunteer);  // Update a volunteer by ID
router.delete("/:id", authAdmin, deleteVolunteer);  // Delete a volunteer by ID

// Event routes
router.post("/createEvent", authAdmin, createEvent);  // Create a new event
router.get("/events/:eventId/volunteers", authAdmin, getVolunteersByEvent);  // Get volunteers by event

// New event-related routes
router.delete("/events/:eventId/volunteers/:volunteerId", authAdmin, removeVolunteerFromEvent);  // Remove a volunteer from an event
router.patch("/events/:eventId/volunteers/hours", authAdmin, updateVolunteerHours);  // Update volunteer hours for an event
router.get("/events/:eventId/stats", authAdmin, getEventStats);  // Get event registration stats

export default router;
