import VolunteerModel from "../models/volunteer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { sendLogin, sendSignup } from "./nodemailerC.js";

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
    const ExistingVolunteer = await VolunteerModel.findOne({ sapId });
    if (ExistingVolunteer) {
      return res
        .status(400)
        .json({ message: "Volunteer already exists.Please Login" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
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
    const volunteer = await VolunteerModel.findOne({ sapId, email });
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

export { signup, login };
