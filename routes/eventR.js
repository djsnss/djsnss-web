import { getPastEvents, getUpcomingEvents } from "../controllers/adminC.js";
import express from "express";

const router = express.Router();

router.get("/upcoming-events", getUpcomingEvents); //api to fetch upcoming events
router.get("/past-events", getPastEvents); //api to fetch past events

export default router;
