import cloudinary from "../config/cloudinary.js";
import EventModel from "../models/event.js";
import VolunteerModel from "../models/volunteer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { sendLogin } from "./nodemailerC.js";
env.config();
const Secret = process.env.SecretKey;

export const login = async (req, res) => {
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
    if (!volunteer.roles.includes("admin")) {
      return res.status(403).json({ message: "The volunteer is not an admin" });
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

export const getVolunteers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const volunteers = await VolunteerModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("connectedEvents");

    const total = await VolunteerModel.countDocuments();

    res.json({
      volunteers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    res.json({
      volunteers,
      totalPages: Math.ceil(totalVolunteers / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching volunteers by event:", error);
    res.status(500).json({ message: "Server error" });
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

    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    res.json(updatedVolunteer);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

    res.json({ message: "Volunteer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const {
      name,
      description,
      startHours,
      endHours,
      TotalNoOfHours,
      date,
      location,
      maxVolunteers,
    } = req.body;
    const existingEvent = await EventModel.findOne({ name });
    if (existingEvent) {
      return res.status(400).json({ message: "Event already exists" });
    }
    const newEvent = new EventModel({
      name,
      description,
      startHours,
      endHours,
      TotalNoOfHours,
      date,
      location,
      maxVolunteers,
    });
    await newEvent.save();
    return res.status(201).json({
      message: "Successfully created new Event",
      Event: newEvent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
