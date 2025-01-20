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
} from "../controllers/adminC.js";

import { authAdmin } from "../middlewares/authVerify.js";

import { uploadNormal } from "../middlewares/multer.js";

const router = express.Router();

// Login route
router.post("/login", login); //login for admin

// Volunteer routes
router.get("/getAllVolunteers", getVolunteers); // Get all volunteers
router.get("/getVolunteer/:id", getVolunteerById); // Get a specific volunteer by ID
router.patch("/updateVolunteer/:id", authAdmin, updateVolunteer); // Update a volunteer by ID
router.delete("/deleteVolunteer/:id", authAdmin, deleteVolunteer); // Delete a volunteer by ID

// Event routes
router.post(
  "/createEvent",
  authAdmin,
  uploadNormal.single("image"),
  createEvent
); // Create a new event

router.get("/:eventId/volunteers", authAdmin, getVolunteersByEvent); // Get volunteers by event
router.get("/event/:eventId", authAdmin, getEventById); // Get a specific event by ID
router.get("/getAllEvents", authAdmin, getAllEvents); // API to fetch all events

// New event-related routes
router.delete(
  "/:eventId/volunteers/:volunteerId",
  authAdmin,
  removeVolunteerFromEvent
); // Remove a volunteer from an event

router.post("/updateHours", authAdmin, updateVolunteerHours); // Update volunteer hours for an event

router.get("/:eventId/stats", authAdmin, getEventStats); // Get event registration stats (the registered volunteer list)

router.put(
  "/updateEvent/:eventId",
  authAdmin,
  uploadNormal.single("image"),
  updateEventDetails
); //API to update Event details

router.get("/getAttendanceList/:eventId", authAdmin, getAttendanceList); //get attendance list

router.put("/change-email", changeEmail); //route to change email of admin

router.post("/send-otp", sendOtpForPasswordChange); //route to get otp for password change

router.put("/change-password", changePassword); //route to change password of admin

router.post("/logout", authAdmin, logout); //logout API for admin

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
