import express from "express";
import Volunteer from "../models/volunteer.js";
import Event from "../models/event.js";

const router = express.Router();

router.get("/volunteer/:id", async (req, res) => {
  try {
    const volunteer = await Volunteer.findOne({ "studentDetails.sapId": req.params.id });
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/event/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
