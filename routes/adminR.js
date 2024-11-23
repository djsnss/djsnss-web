import express from "express";
import {
  getVolunteers,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  createEvent,
} from "../controllers/adminC.js";
import { authAdmin } from "../middlewares/authVerify.js";

const router = express.Router();

//admin login and signup?
router.get("/", getVolunteers);
router.get("/:id", getVolunteerById);
router.patch("/:id", authAdmin, updateVolunteer);
router.delete("/:id", authAdmin, deleteVolunteer);
router.post("/createEvent", authAdmin, createEvent);

export default router;
