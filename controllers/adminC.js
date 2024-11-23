import Volunteer from "../models/volunteer.js";
import cloudinary from "../config/cloudinary.js";
import EventModel from "../models/event.js";

/* export const createVolunteer = async (req, res) => {
  try {
    const { 
      passportPhoto, 
      normalPhoto, 
      description, 
      parentDetails, 
      studentDetails, 
      password,
      roles,
      hobbies
    } = req.body;

    // Handle photo uploads to Cloudinary
    let passportPhotoResult = passportPhoto ? 
      await cloudinary.uploader.upload(passportPhoto) : null;
    let normalPhotoResult = normalPhoto ? 
      await cloudinary.uploader.upload(normalPhoto) : null;

    const newVolunteer = new Volunteer({
      passportPhoto: {
        url: passportPhotoResult?.secure_url || '',
        public_id: passportPhotoResult?.public_id || ''
      },
      normalPhoto: {
        url: normalPhotoResult?.secure_url || '',
        public_id: normalPhotoResult?.public_id || ''
      },
      description,
      parentDetails,
      studentDetails,
      password: await bcrypt.hash(password, 10),
      roles,
      hobbies
    });

    await newVolunteer.save();
    res.status(201).json(newVolunteer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; */

export const getVolunteers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const volunteers = await Volunteer.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("connectedEvents");

    const total = await Volunteer.countDocuments();

    res.json({
      volunteers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id).populate(
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
      const oldVolunteer = await Volunteer.findById(id);
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

    const updatedVolunteer = await Volunteer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

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
    const volunteerToDelete = await Volunteer.findById(id);

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
    await Volunteer.findByIdAndDelete(id);

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
