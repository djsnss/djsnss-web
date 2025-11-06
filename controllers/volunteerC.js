import VolunteerModel from "../models/volunteer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { sendLogin, sendSignup, sendOTP } from "./nodemailerC.js";
import EventModel from "../models/event.js";
import cloudinary from "../config/cloudinary.js";
import crypto from "crypto";

env.config();
const Secret = process.env.SecretKey;

const signup = async (req, res) => {
  try {
    const {
      description,
      motherName,
      fatherName,
      motherEmail,
      fatherEmail,
      name,
      branch,
      sapId,
      phoneNumber,
      email,
      password,
      hobbies,
      gender,
      caste,
    } = req.body;

    // Ensure a photo file is provided
    if (!req.file?.path) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const ExistingVolunteer = await VolunteerModel.findOne({ sapId });
    if (ExistingVolunteer) {
      return res
        .status(400)
        .json({ message: "Volunteer already exists.Please Login" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Accept any normal photo (no 1:1 or 300x300 constraint)
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "passportPhoto",
    });

    const newVolunteer = new VolunteerModel({
      description,
      parentDetails: {
        motherName,
        motherEmail,
        fatherEmail,
        fatherName,
      },
      studentDetails: {
        name,
        branch,
        sapId,
        phoneNumber,
        email,
        gender,
        caste,
      },
      passportPhoto: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      normalPhoto: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      password: hashedPassword,
      hobbies,
    });
    const token = jwt.sign(
      { volunteerId: newVolunteer._id, role: "volunteer" },
      Secret,
      { expiresIn: "7d" }
    );
    await newVolunteer.save();
    sendSignup(req, res);
    return res.status(201).json({
      token,
      message: "Volunteer successfully registered",
      volunteer: newVolunteer,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { sapId, email, password } = req.body;
    if (!sapId || !email || !password) {
      return res
        .status(400)
        .json({ message: "sapId, email, and password are required" });
    }
    const volunteer = await VolunteerModel.findOne({
      "studentDetails.sapId": sapId,
      "studentDetails.email": email,
    });
    if (!volunteer) {
      return res.status(400).json({ message: "Invalid sapId or email" });
    }
    const match = await bcrypt.compare(password, volunteer.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { volunteerId: volunteer._id, role: "volunteer" },
      Secret,
      { expiresIn: "7d" }
    );
    sendLogin(req, res);
    return res.status(200).json({ token, volunteer });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const registerEvent = async (req, res) => {
  try {
    const volunteerId = req.volunteer?.volunteerId;
    if (!volunteerId) {
      return res
        .status(400)
        .json({ message: "Volunteer not found in request" });
    }

    const eventId = req.params.eventId;

    // Check if volunteer is already registered for this event using MongoDB query
    const existingRegistration = await VolunteerModel.findOne({
      _id: volunteerId,
      "connectedEvents.eventId": eventId,
    });

    if (existingRegistration) {
      const event = await EventModel.findById(eventId);
      return res.status(400).json({
        message: `Already registered for ${event?.name || "this event"}`,
      });
    }

    const volunteer = await VolunteerModel.findById(volunteerId);
    const event = await EventModel.findById(eventId);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Register the volunteer
    volunteer.connectedEvents.push({ eventId: eventId });
    event.registeredVolunteers.push({ volunteerId: volunteer._id });

    // Save changes
    await volunteer.save();
    await event.save();

    return res
      .status(200)
      .json({ message: `Successfully registered for ${event.name}` });
  } catch (err) {
    console.error("Register Event Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const uploadNormalPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File not found" });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "normalPhoto",
    });
    const volunteer = await VolunteerModel.findById(req.volunteer.volunteerId);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found." });
    }
    volunteer.normalPhoto.url = result.secure_url;
    volunteer.normalPhoto.public_id = result.public_id;
    await volunteer.save();
    return res.status(200).json({
      message: "Volunteer normal photo uploaded",
      normalPhoto: volunteer.normalPhoto,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error uploading image" });
  }
};

const updateNormalPhoto = async (req, res) => {
  try {
    const volunteer = await VolunteerModel.findById(req.volunteer.volunteerId);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    if (volunteer.normalPhoto && volunteer.normalPhoto.public_id) {
      await cloudinary.uploader.destroy(volunteer.normalPhoto.public_id);
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "normalPhoto",
    });
    volunteer.normalPhoto.url = result.secure_url;
    volunteer.normalPhoto.public_id = result.public_id;
    await volunteer.save();
    return res.status(200).json({
      message: "Volunteer normal photo updated",
      normalPhoto: volunteer.normalPhoto,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating image" });
  }
};

const checkHours = async (req, res) => {
  try {
    const volunteer = await VolunteerModel.findById(
      req.volunteer.volunteerId
    ).populate({
      path: "connectedEvents.eventId",
      select: "name TotalNoOfHours",
    });
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    const connectedEvents = volunteer.connectedEvents
      .map((event) => {
        if (event.eventId) {
          return {
            eventId: event.eventId._id,
            eventName: event.eventId.name,
            totalNoOfHours: event.eventId.TotalNoOfHours,
            attended: event.attended,
            hoursCompleted: event.hoursCompleted,
          };
        }
        return null;
      })
      .filter(Boolean);
    return res.status(200).json({
      name: volunteer.studentDetails.name,
      hours: volunteer.volunteerHours,
      image: volunteer.normalPhoto.url,
      connectedEvents,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error checking hours" });
  }
};

const otpStore = {}; // Temporary store for OTPs and expiry

const sendOtpForPasswordChange = async (req, res) => {
  try {
    const email = req.body.email;
    const volunteer = await VolunteerModel.findOne({
      "studentDetails.email": email,
    });
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    // Generate and send OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes

    otpStore[volunteer.studentDetails.email] = { otp, expiresAt }; // Store OTP with expiry

    await sendOTP(volunteer.studentDetails.email, otp); // Use your email service

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Send OTP Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    if (!otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "OTP and new password are required" });
    }
    // Find the volunteer email from the OTP store using the provided OTP
    let volunteerEmail = null;
    for (let email in otpStore) {
      if (otpStore[email].otp === otp) {
        volunteerEmail = email;
        break;
      }
    }
    if (!volunteerEmail) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Find volunteer by email (no need for the volunteer ID)
    const volunteer = await VolunteerModel.findOne({
      "studentDetails.email": volunteerEmail,
    });
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    const storedOtpData = otpStore[volunteer.studentDetails.email];
    if (!storedOtpData) {
      return res
        .status(400)
        .json({ message: "No OTP found. Please request a new one." });
    }

    const { otp: storedOtp, expiresAt } = storedOtpData;

    // Check if OTP is expired
    if (Date.now() > expiresAt) {
      delete otpStore[volunteer.email]; // Remove expired OTP
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

    // Update volunteer password
    volunteer.password = hashedPassword;
    await volunteer.save();

    delete otpStore[volunteer.email]; // Remove OTP after successful password change

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Change Password Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  try {
    // Clear token from cookies if it's stored there
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const verifyToken = async (req, res) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const bearerToken = token.split(" ")[1];
    if (bearerToken == null) {
      return res.status(401).json({ message: "token null" });
    }
    const verified = jwt.verify(bearerToken, process.env.SecretKey);
    req.volunteer = verified;
    return res
      .status(200)
      .json({ message: "Token verified successfully", volunteer: verified });
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

export {
  signup,
  login,
  registerEvent,
  uploadNormalPhoto,
  updateNormalPhoto,
  checkHours,
  sendOtpForPasswordChange,
  changePassword,
  logout,
  verifyToken,
};
