import cloudinary from "../config/cloudinary.js";
import EventModel from "../models/event.js";
import VolunteerModel from "../models/volunteer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { sendLogin, sendOTP } from "./nodemailerC.js";
import AdminModel from "../models/admin.js";
import crypto from "crypto";
import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: { tls: true },
});
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

(async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("✅ Redis Connected!");
    preloadCache();
  }
})();

const preloadCache = async () => {
  console.log("🚀 Preloading cache...");
  try {
    // Instead of fetching all and sorting in memory, let MongoDB sort
    const upcomingEvents = await EventModel.find({
      status: "Upcoming",
      date: { $gte: new Date() }, // Only fetch future events
    })
      .sort({ date: 1 }) // MongoDB will use index to sort efficiently
      .limit(50) // Limit results for better performance
      .lean();

    const pastEvents = await EventModel.find({
      status: "Past",
      date: { $lt: new Date() }, // Only fetch past events
    })
      .sort({ date: -1 }) // Recent past events first
      .limit(20) // Limit to recent past events
      .lean();

    await redisClient.setEx("upcomingEvents", JSON.stringify(upcomingEvents));
    await redisClient.setEx("pastEvents", JSON.stringify(pastEvents));
    console.log("✅ Cache preloaded!");
  } catch (err) {
    console.error("⚠️ Error preloading cache:", err);
  }
};

const getCachedEvents = async () => {
  const cacheKey = "events:all";

  try {
    // Try to get from cache first
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // If not in cache, fetch from DB with optimized query
    const [upcomingEvents, pastEvents] = await Promise.all([
      EventModel.find({
        status: "Upcoming",
        date: { $gte: new Date() },
      })
        .sort({ date: 1 })
        .limit(50)
        .select(
          "name description date location maxVolunteers registeredVolunteers photo status"
        ) // Match your schema fields
        .lean(),

      EventModel.find({
        status: "Past",
        date: { $lt: new Date() },
      })
        .sort({ date: -1 })
        .limit(20)
        .select(
          "name description date location maxVolunteers registeredVolunteers photo status"
        )
        .lean(),
    ]);

    const result = { upcomingEvents, pastEvents };

    // Cache for 5 minutes
    await redisClient.setEx(cacheKey, 300, JSON.stringify(result));

    return result;
  } catch (error) {
    console.error("Redis error:", error);
    // Fallback to direct DB query
    const [upcomingEvents, pastEvents] = await Promise.all([
      EventModel.find({
        status: "Upcoming",
        date: { $gte: new Date() },
      })
        .sort({ date: 1 })
        .limit(50)
        .lean(),

      EventModel.find({
        status: "Past",
        date: { $lt: new Date() },
      })
        .sort({ date: -1 })
        .limit(20)
        .lean(),
    ]);

    return { upcomingEvents, pastEvents };
  }
};

env.config();
const Secret = process.env.SecretKey;

const clearCache = async () => {
  try {
    await Promise.all([
      redisClient.del("upcomingEvents"),
      redisClient.del("pastEvents"),
      redisClient.del("events:all"),
    ]);
    console.log("🗑️ All caches cleared");
  } catch (error) {
    console.error("❌ Error clearing cache:", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const admin = await AdminModel.findOne({ email: email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email" });
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ adminId: admin._id, role: "admin" }, Secret, {
      expiresIn: "1d",
    });
    sendLogin(req, res);
    return res.status(200).json({ token, admin });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getVolunteers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const volunteers = await VolunteerModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("connectedEvents")
      .lean();

    const total = await VolunteerModel.countDocuments();

    return res.json({
      volunteers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getVolunteersByEvent = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { eventId } = req.params;

    // Find the event by its ID
    const event = await EventModel.findById(eventId).populate(
      "registeredVolunteers.volunteerId"
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Extract registered volunteers
    const totalVolunteers = event.registeredVolunteers.length;
    const volunteers = event.registeredVolunteers
      .slice((page - 1) * limit, page * limit)
      .map((entry) => entry.volunteerId); // Extract the volunteer details

    return res.json({
      volunteers,
      totalPages: Math.ceil(totalVolunteers / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching volunteers by event:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await VolunteerModel.findById(req.params.id).populate(
      "connectedEvents"
    );

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    return res.status(200).json(volunteer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Handle photo updates
    if (updateData.passportPhoto) {
      const oldVolunteer = await VolunteerModel.findById(id);
      if (oldVolunteer.passportPhoto.public_id) {
        await cloudinary.uploader.destroy(oldVolunteer.passportPhoto.public_id);
      }
      const uploadResult = await cloudinary.uploader.upload(
        updateData.passportPhoto
      );
      updateData.passportPhoto = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    // Hash password if updated
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedVolunteer = await VolunteerModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedVolunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    return res.json(updatedVolunteer);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

export const deleteVolunteer = async (req, res) => {
  try {
    const { id } = req.params;

    // Find volunteer to delete associated cloudinary images
    const volunteerToDelete = await VolunteerModel.findById(id);

    if (!volunteerToDelete) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    // Delete cloudinary images
    if (volunteerToDelete.passportPhoto.public_id) {
      await cloudinary.uploader.destroy(
        volunteerToDelete.passportPhoto.public_id
      );
    }
    if (volunteerToDelete.normalPhoto.public_id) {
      await cloudinary.uploader.destroy(
        volunteerToDelete.normalPhoto.public_id
      );
    }

    // Delete volunteer
    await VolunteerModel.findByIdAndDelete(id);

    return res.json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Remove a volunteer from an event
export const removeVolunteerFromEvent = async (req, res) => {
  try {
    const { volunteerId, eventId } = req.params;

    const [event, volunteer] = await Promise.all([
      EventModel.findById(eventId),
      VolunteerModel.findById(volunteerId),
    ]);

    if (!event || !volunteer) {
      return res.status(404).json({
        message: !event ? "Event not found" : "Volunteer not found",
      });
    }

    // Remove volunteer from event
    event.registeredVolunteers = event.registeredVolunteers.filter(
      (registration) => registration.volunteerId.toString() !== volunteerId
    );

    // Remove event from volunteer's connected events
    volunteer.connectedEvents = volunteer.connectedEvents.filter(
      (eventRef) => eventRef.toString() !== eventId
    );

    await Promise.all([event.save(), volunteer.save()]);

    return res
      .status(200)
      .json({ message: "Volunteer removed from event successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Update volunteer hours for an event
export const updateVolunteerHours = async (req, res) => {
  try {
    const { eventId, attendanceList } = req.body;
    // Validate request
    if (!eventId || !Array.isArray(attendanceList)) {
      return res.status(400).json({
        message: "Invalid request. Provide eventId and attendanceList.",
      });
    }
    // Fetch event details
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const updates = [];
    // Iterate through the attendance list
    for (const { volunteerId, attended } of attendanceList) {
      if (!volunteerId || typeof attended !== "boolean") {
        updates.push({
          volunteerId,
          status: "failed",
          reason: "Invalid data format",
        });
        continue;
      }
      // Check if the volunteer is registered for the event
      const isRegistered = event.registeredVolunteers.some(
        (reg) => reg.volunteerId.toString() === volunteerId
      );
      if (!isRegistered) {
        updates.push({
          volunteerId,
          status: "failed",
          reason: "Volunteer not registered for the event",
        });
        continue;
      }
      // Update attendance in the event model
      const attendanceIndex = event.attendance.findIndex(
        (att) => att.volunteerId.toString() === volunteerId
      );
      if (attendanceIndex >= 0) {
        event.attendance[attendanceIndex].attended = attended;
      } else {
        event.attendance.push({ volunteerId, attended });
      }
      // If attended, update volunteer's individual event hours
      if (attended) {
        const volunteer = await VolunteerModel.findById(volunteerId);
        if (volunteer) {
          const currentEventHours = event.TotalNoOfHours;

          // Update individual event hours and attended status
          const volunteerEvent = volunteer.connectedEvents.find(
            (eventItem) => eventItem.eventId.toString() === eventId
          );

          if (volunteerEvent) {
            volunteerEvent.hoursCompleted =
              (volunteerEvent.hoursCompleted || 0) + currentEventHours;
            volunteerEvent.attended = true; // Mark this event as attended
          } else {
            volunteer.connectedEvents.push({
              eventId,
              hoursCompleted: currentEventHours,
              attended: true, // Mark as attended
            });
          }

          // Update total volunteer hours
          volunteer.volunteerHours =
            (volunteer.volunteerHours || 0) + currentEventHours;
          await volunteer.save();

          updates.push({
            volunteerId,
            status: "success",
            updatedHours: volunteer.volunteerHours,
            eventHours: volunteerEvent
              ? volunteerEvent.hoursCompleted
              : currentEventHours,
          });
        } else {
          updates.push({
            volunteerId,
            status: "failed",
            reason: "Volunteer not found",
          });
        }
      } else {
        updates.push({
          volunteerId,
          status: "skipped",
          reason: "Marked as not attended",
        });
      }
    }
    // Save updated event
    await event.save();
    return res.status(200).json({
      message: "Attendance and volunteer hours updated successfully",
      updates,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Get event registration statistics
export const getEventStats = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await EventModel.findById(eventId).populate(
      "registeredVolunteers.volunteerId",
      "studentDetails.sapId studentDetails.email"
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const stats = {
      totalSpots: event.maxVolunteers,
      registeredCount: event.registeredVolunteers.length,
      availableSpots: event.maxVolunteers - event.registeredVolunteers.length,
      registrationPercentage:
        (event.registeredVolunteers.length / event.maxVolunteers) * 100,
      registeredVolunteers: event.registeredVolunteers.map((registration) => ({
        sapId: registration.volunteerId.studentDetails.sapId,
        email: registration.volunteerId.studentDetails.email,
        registeredAt: registration.registeredAt,
      })),
    };

    return res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateEventStatus = async () => {
  try {
    const currentDate = new Date();

    // Find all expired upcoming events
    const expiredEvents = await EventModel.find({
      status: "Upcoming",
      date: { $lt: currentDate }, // Events with past dates
    });

    if (expiredEvents.length > 0) {
      // Update their status to "Past"
      await EventModel.updateMany(
        { _id: { $in: expiredEvents.map((event) => event._id) } },
        { $set: { status: "Past" } }
      );

      console.log(`✅ Updated ${expiredEvents.length} events to Past`);

      // Remove only the modified events from Redis cache
      const upcomingEventsCache = await redisClient.get("upcomingEvents");
      if (upcomingEventsCache) {
        let cachedEvents = JSON.parse(upcomingEventsCache);
        cachedEvents = cachedEvents.filter(
          (event) =>
            !expiredEvents.some(
              (expired) => String(expired._id) === String(event._id)
            )
        );
        await redisClient.setEx("upcomingEvents", JSON.stringify(cachedEvents));
      }

      // Add these events to pastEvents cache
      const pastEventsCache = await redisClient.get("pastEvents");
      let pastEvents = pastEventsCache ? JSON.parse(pastEventsCache) : [];
      pastEvents = [...expiredEvents, ...pastEvents]; // Append to pastEvents
      await redisClient.setEx("pastEvents", JSON.stringify(pastEvents));
    }
  } catch (err) {
    console.error("❌ Error updating event statuses:", err);
  }
};

export const getUpcomingEvents = async (req, res) => {
  try {
    await updateEventStatus();

    const { upcomingEvents } = await getCachedEvents();

    return res.status(200).json({
      message: "Upcoming events fetched successfully",
      events: upcomingEvents,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching upcoming events" });
  }
};
export const getPastEvents = async (req, res) => {
  try {
    const { pastEvents } = await getCachedEvents();

    return res.status(200).json({
      message: "Past events fetched successfully",
      events: pastEvents,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching past events" });
  }
};

export const getAttendanceList = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Fetch event details
    const event = await EventModel.findById(eventId).populate(
      "registeredVolunteers.volunteerId",
      "name email"
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Separate registered and attended volunteers
    const registeredVolunteers = event.registeredVolunteers.map(
      (volunteer) => ({
        volunteerId: volunteer.volunteerId._id,
        name: volunteer.volunteerId.name,
        email: volunteer.volunteerId.email,
      })
    );

    const attendedVolunteers = event.attendance
      .filter((att) => att.attended)
      .map((att) => ({
        volunteerId: att.volunteerId,
        name: registeredVolunteers.find(
          (vol) => vol.volunteerId.toString() === att.volunteerId.toString()
        )?.name,
        email: registeredVolunteers.find(
          (vol) => vol.volunteerId.toString() === att.volunteerId.toString()
        )?.email,
      }));

    return res.status(200).json({
      message: "Attendance list fetched successfully",
      registeredVolunteers,
      attendedVolunteers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const changeEmail = async (req, res) => {
  try {
    const { currentPassword, newEmail } = req.body;
    if (!currentPassword || !newEmail) {
      return res
        .status(400)
        .json({ message: "Current password and new email are required" });
    }
    const admin = await AdminModel.findOne();
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const match = await bcrypt.compare(currentPassword, admin.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // Update email
    admin.email = newEmail;
    await admin.save();
    return res
      .status(200)
      .json({ message: "Email updated successfully", email: admin.email });
  } catch (err) {
    console.error("Change Email Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const otpStore = {}; // Temporary store for OTPs and expiry

export const sendOtpForPasswordChange = async (req, res) => {
  try {
    const admin = await AdminModel.findOne();
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    // Generate and send OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes

    otpStore[admin.email] = { otp, expiresAt }; // Store OTP with expiry

    await sendOTP(admin.email, otp); // Use your email service

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Send OTP Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    if (!otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "OTP and new password are required" });
    }

    const admin = await AdminModel.findOne();
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const storedOtpData = otpStore[admin.email];
    if (!storedOtpData) {
      return res
        .status(400)
        .json({ message: "No OTP found. Please request a new one." });
    }

    const { otp: storedOtp, expiresAt } = storedOtpData;

    // Check if OTP is expired
    if (Date.now() > expiresAt) {
      delete otpStore[admin.email]; // Remove expired OTP
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }

    // Validate the OTP
    if (storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update admin password
    admin.password = hashedPassword;
    await admin.save();

    delete otpStore[admin.email]; // Remove OTP after successful password change

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Change Password Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  try {
    // Clear token from cookies if it's stored there
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json(event);
  } catch (err) {
    console.error("Fetching Event error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    await updateEventStatus(); // Update any expired events first

    const { upcomingEvents, pastEvents } = await getCachedEvents();
    const allEvents = [...upcomingEvents, ...pastEvents];

    if (!allEvents.length) {
      return res.status(404).json({ message: "No events found" });
    }

    return res.status(200).json({
      message: "All events fetched successfully",
      events: allEvents,
      upcoming: upcomingEvents.length,
      past: pastEvents.length,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      message: "Server error while fetching events",
    });
  }
};

export const updateEventDetails = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updatedData = req.body;

    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Handle photo update if a new file is provided
    if (req.file) {
      if (event.photo && event.photo.public_id) {
        await cloudinary.uploader.destroy(event.photo.public_id);
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "EventPhoto",
      });
      updatedData.photo = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    await clearCache(); // Clear cache after updating event

    return res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({
      message: "Failed to update event",
      error: error.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await EventModel.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await clearCache(); // Clear cache after deleting event

    return res.status(200).json({ message: "Event successfully deleted" });
  } catch (err) {
    console.error("Error deleting events:", err);
    return res.status(500).json({
      message: "Failed to delete events",
      error: err.message,
    });
  }
};

// Public: Send OTP for forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Validate email format to prevent NoSQL injection
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const admin = await AdminModel.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    otpStore[email] = { otp, expiresAt };
    await sendOTP(email, otp);
    return res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Public: Reset password with OTP
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    // Validate email format to prevent NoSQL injection
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const admin = await AdminModel.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    const storedOtpData = otpStore[email];
    if (!storedOtpData)
      return res
        .status(400)
        .json({ message: "No OTP found. Please request a new one." });
    const { otp: storedOtp, expiresAt } = storedOtpData;
    if (Date.now() > expiresAt) {
      delete otpStore[email];
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }
    if (storedOtp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();
    delete otpStore[email];
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const verifyToken = async (req, res) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const bearerToken = token.split(" ")[1];
    if (bearerToken == null) {
      return res.status(401).json({ message: "token null" });
    }
    const verified = jwt.verify(bearerToken, process.env.SecretKey);
    req.admin = verified;
    return res
      .status(200)
      .json({ message: "Token verified successfully", admin: verified });
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

export const createEvent = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      longDescription,
      startHours,
      endHours,
      TotalNoOfHours,
      date,
      location,
      maxVolunteers,
      scope,
    } = req.body;
    // Check if the event already exists
    const existingEvent = await EventModel.findOne({ name });
    if (existingEvent) {
      return res.status(400).json({ message: "Event already exists" });
    }
    // Calculate the event status
    const currentDate = new Date();
    const eventDate = new Date(date);
    const isSameDay =
      currentDate.toISOString().split("T")[0] ===
      eventDate.toISOString().split("T")[0];
    let status = eventDate > currentDate || isSameDay ? "Upcoming" : "Past";
    // Create the new event
    const newEvent = new EventModel({
      name,
      slug,
      description,
      longDescription,
      startHours,
      endHours,
      TotalNoOfHours,
      date,
      location,
      maxVolunteers,
      status,
      scope,
    });
    if (req.file) {
      // Upload the photo if provided
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "EventPhoto",
      });
      newEvent.photo = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    await newEvent.save();
    await clearCache();
    return res.status(200).json({
      message: "Successfully created new Event",
      Event: newEvent,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
