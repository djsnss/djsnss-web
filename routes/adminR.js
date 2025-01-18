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
  updateEventPhoto,
  uploadEventPhoto,
  getAttendanceList,
} from "../controllers/adminC.js";

import { authAdmin } from "../middlewares/authVerify.js";

import { uploadNormal } from "../middlewares/multer.js";

const router = express.Router();

// Login route
router.post("/login", login); //login for admin

// Volunteer routes
router.get("/", getVolunteers); // Get all volunteers
router.get("/:id", getVolunteerById); // Get a specific volunteer by ID
router.patch("/:id", authAdmin, updateVolunteer); // Update a volunteer by ID
router.delete("/:id", authAdmin, deleteVolunteer); // Delete a volunteer by ID

// Event routes
router.post("/createEvent", authAdmin, createEvent); // Create a new event
router.get("/:eventId/volunteers", authAdmin, getVolunteersByEvent); // Get volunteers by event

router.post(
  "/:id/uploadPhoto",
  authAdmin,
  uploadNormal.single("image"),
  uploadEventPhoto
); //Upload Event photo

router.post(
  "/:id/updatePhoto",
  authAdmin,
  uploadNormal.single("image"),
  updateEventPhoto
); //Update Event photo

// New event-related routes
router.delete(
  "/:eventId/volunteers/:volunteerId",
  authAdmin,
  removeVolunteerFromEvent
); // Remove a volunteer from an event

router.post("/updateHours", authAdmin, updateVolunteerHours); // Update volunteer hours for an event

router.get("/:eventId/stats", authAdmin, getEventStats); // Get event registration stats (the registered volunteer list)

router.get("/getAttendanceList/:eventId", authAdmin, getAttendanceList); //get attendance list

export default router;

//example request to update volunteer Hours
/*{
  "eventId": "EVENT_ID",
  "attendanceList": [
    { "volunteerId": "VOLUNTEER_ID_1", "attended": true },
    { "volunteerId": "VOLUNTEER_ID_2", "attended": false },
    { "volunteerId": "VOLUNTEER_ID_3", "attended": true }
  ]
}
*/

/*the process for updating hours of volunteer should be
1.Admin login (get the token needed for authAdmin)
2.Get volunteers by the event (the registration list to be displayed to the admin) 
there will be a checkbox besides each volunteer to mark attendance and update hours accordingly
3.Get attendance list of a event
4.Update Hours by sending the attendance list and eventId
*/

//FRONTEND WORK
//The frontend needs to capture checkbox toggles for volunteer attendance, update the attendanceList with volunteerId and attended status, and send the updated list to the backend via a POST request.
