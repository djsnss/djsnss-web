import {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  deleteAnnouncement,
  updateAnnouncement,
} from "../controllers/announcementC.js";
import express from "express";
import { authAdmin } from "../middlewares/authVerify.js";
import { uploadAnnouncement } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/create",
  uploadAnnouncement.single("announcement"),
  authAdmin,
  createAnnouncement
);
router.get("/get-announcements", getAllAnnouncements);
router.get("/get-announcement/:announcementId", getAnnouncementById);
router.delete(
  "/delete-announcement/:announcementId",
  authAdmin,
  deleteAnnouncement
);
router.put(
  "/update-announcement/:announcementId",
  uploadAnnouncement.single("announcement"),
  authAdmin,
  updateAnnouncement
);

export default router;
