import { getPastEvents, getUpcomingEvents } from "../controllers/adminC.js";
import express from "express";

const router = express.Router();

router.get("/upcoming-events", getUpcomingEvents);
router.get("/past-events", getPastEvents);

export default router;
