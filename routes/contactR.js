import express from "express";
import { sendContactMessage } from "../controllers/contactC.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3, 
  message: {
    message: "Too many contact form submissions. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/send-message", contactLimiter, sendContactMessage);

export default router;
