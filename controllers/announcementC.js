import AnnouncementModel from "../models/announcement.js";
import cloudinary from "../config/cloudinary.js";

// Create Announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { title, typeOfContent, content, date, isNew } = req.body;

    if (!title || !typeOfContent) {
      return res.status(400).json({ message: "Title and type are required" });
    }

    let announcementData = {
      title,
      typeOfContent,
      date: date ? new Date(date) : new Date(),
      isNew: isNew !== undefined ? isNew : true,
    };

    if (typeOfContent === "text") {
      if (!content) {
        return res
          .status(400)
          .json({ message: "Content is required for text announcements" });
      }
      announcementData.content = content;
    } else if (typeOfContent === "pdf") {
      if (!req.file) {
        return res.status(400).json({ message: "PDF file is required" });
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "announcements/pdfs",
        resource_type: "image", // Use image instead of raw
        format: "pdf", // Specify PDF format
        public_id: `announcement_pdf_${Date.now()}`,
      });

      announcementData.link = result.secure_url;
    }

    const announcement = new AnnouncementModel(announcementData);
    await announcement.save();

    return res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    console.error("Create announcement error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get All Announcements
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await AnnouncementModel.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(announcements);
  } catch (error) {
    console.error("Get announcements error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get Single Announcement
export const getAnnouncementById = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const announcement = await AnnouncementModel.findById(announcementId);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    return res.status(200).json(announcement);
  } catch (error) {
    console.error("Get announcement error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update Announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { title, typeOfContent, content } = req.body;

    const announcement = await AnnouncementModel.findById(announcementId);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    let updateData = { title, typeOfContent };

    if (typeOfContent === "text") {
      if (!content) {
        return res
          .status(400)
          .json({ message: "Content is required for text announcements" });
      }
      updateData.content = content;
      updateData.link = undefined;
    } else if (typeOfContent === "pdf") {
      if (req.file) {
        // Upload new PDF
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "announcements/pdfs",
          resource_type: "image", // Use image instead of raw
          format: "pdf", // Specify PDF format
          public_id: `announcement_pdf_${Date.now()}`,
        });
        updateData.link = result.secure_url;
      } else {
        // Keep existing link if no new file
        updateData.link = announcement.link;
      }
      updateData.content = undefined;
    }

    const updatedAnnouncement = await AnnouncementModel.findByIdAndUpdate(
      announcementId,
      updateData,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Announcement updated successfully",
      announcement: updatedAnnouncement,
    });
  } catch (error) {
    console.error("Update announcement error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete Announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;

    const announcement = await AnnouncementModel.findById(announcementId);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    // If it's a PDF, delete from Cloudinary first
    if (announcement.typeOfContent === "pdf" && announcement.link) {
      try {
        // Extract public_id from Cloudinary URL
        // For raw files: https://res.cloudinary.com/cloud/raw/upload/v123/folder/filename.pdf
        // For image files: https://res.cloudinary.com/cloud/image/upload/v123/folder/filename.pdf

        const urlPattern = /\/(?:image|raw)\/upload\/(?:v\d+\/)?(.+)$/;
        const match = announcement.link.match(urlPattern);

        if (match) {
          let publicId = match[1];
          // Remove file extension for deletion
          publicId = publicId.replace(/\.[^/.]+$/, "");

          console.log("Attempting to delete with public_id:", publicId);

          // Try deleting as image first (for newer uploads)
          let deleteResult = await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
          });

          // If that fails, try as raw (for older uploads)
          if (deleteResult.result !== "ok") {
            deleteResult = await cloudinary.uploader.destroy(publicId, {
              resource_type: "raw",
            });
          }

          console.log("Cloudinary deletion result:", deleteResult);
        }
      } catch (cloudinaryError) {
        console.error("Error deleting from Cloudinary:", cloudinaryError);
        // Don't fail the entire operation if Cloudinary deletion fails
      }
    }

    // Delete from database
    await AnnouncementModel.findByIdAndDelete(announcementId);

    return res
      .status(200)
      .json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Delete announcement error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
