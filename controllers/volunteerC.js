import VolunteerModel from "../models/volunteer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { sendLogin, sendSignup } from "./nodemailerC.js";
import EventModel from "../models/event.js";
import sharp from "sharp";
import cloudinary from "../config/cloudinary.js";

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
      branch,
      sapId,
      phoneNumber,
      email,
      password,
      hobbies,
    } = req.body;
    const filePath = req.file.path;
    const metadata = await sharp(filePath).metadata();
    const isSquare = metadata.width === metadata.height; // Check if it's square
    const isValidSize = metadata.width === 300 && metadata.height === 300; // Passport size in pixels

    const ExistingVolunteer = await VolunteerModel.findOne({ sapId });
    if (ExistingVolunteer) {
      return res
        .status(400)
        .json({ message: "Volunteer already exists.Please Login" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!isSquare) {
      return res
        .status(400)
        .send("Image is not square (1:1 aspect ratio required)");
    }

    if (!isValidSize) {
      return res.status(400).send("Image dimensions should be 300x300 pixels");
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "PassportPhoto",
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
        branch,
        sapId,
        phoneNumber,
        email,
      },
      passportPhoto: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      password: hashedPassword,
      hobbies,
    });
    await newVolunteer.save();
    sendSignup(req, res);
    return res.status(201).json({
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
      return res.status(400).send("Invalid sapId or email");
    }
    const match = await bcrypt.compare(password, volunteer.password);
    if (!match) {
      return res.status(400).send("Invalid password");
    }
    const token = jwt.sign({ volunteerId: volunteer._id }, Secret);
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
      return res.status(400).send("Volunteer not found in request");
    }
    const volunteer = await VolunteerModel.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).send("Volunteer not found");
    }
    const eventId = req.params.eventId;
    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).send("Event not found");
    }
    // Ensure arrays exist
    if (!Array.isArray(volunteer.connectedEvents)) {
      volunteer.connectedEvents = [];
    }
    if (!Array.isArray(event.registeredVolunteers)) {
      event.registeredVolunteers = [];
    }
    // Avoid duplicate registration
    if (volunteer.connectedEvents.includes(eventId)) {
      return res
        .status(400)
        .send({ message: `Already registered for ${event.name}` });
    }
    // Register the volunteer
    volunteer.connectedEvents.push(eventId);
    event.registeredVolunteers.push({ volunteerId: volunteer._id });
    // Save changes
    await volunteer.save();
    await event.save();
    res
      .status(200)
      .send({ message: `Successfully registered for ${event.name}` });
  } catch (err) {
    console.error("Register Event Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const uploadNormalPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("File not found");
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "normalPhoto",
    });
    const volunteer = await VolunteerModel.findById(req.volunteer.volunteerId);
    if (!volunteer) {
      return res.status(404).send("Volunteer not found.");
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
    return res.status(500).send("Error uploading image");
  }
};

const updateNormalPhoto = async (req, res) => {
  try {
    const volunteer = await VolunteerModel.findById(req.volunteer.volunteerId);
    if (!volunteer) {
      return res.status(404).send("Volunteer not found");
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
    return res.status(500).send("Error updating image");
  }
};

const checkHours = async (req, res) => {
  try {
    const volunteer = await VolunteerModel.findById(req.volunteer.volunteerId);
    if (!volunteer) {
      return res.status(404).send("Volunteer not found");
    }
    return res
      .status(200)
      .json({
        name: volunteer.studentDetails.name,
        hours: volunteer.volunteerHours,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error checking hours");
  }
};

export {
  signup,
  login,
  registerEvent,
  uploadNormalPhoto,
  updateNormalPhoto,
  checkHours,
};
