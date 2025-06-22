import AnnouncementModel from "../models/announcement.js";
import cloudinary from "../config/cloudinary.js";

// Create Announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { title, typeOfContent, content, urlLink, date, isNew } = req.body;

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

      const publicId = `announcements/pdfs/announcement_pdf_${Date.now()}`;

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "announcements/pdfs",
        resource_type: "raw",
        type: "authenticated",
        public_id: publicId,
      });

      announcementData.pdfLink = result.secure_url;
    } else if (typeOfContent === "link") {
      if (!urlLink) {
        return res
          .status(400)
          .json({ message: "URL link is required for link announcements" });
      }
      announcementData.urlLink = urlLink;
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

    return res.status(200).json({ announcements });
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
    const { title, typeOfContent, content, urlLink } = req.body;

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
      // Clear other fields
      updateData.pdfLink = undefined;
      updateData.urlLink = undefined;
    } else if (typeOfContent === "pdf") {
      if (req.file) {
        // Delete old PDF from Cloudinary if exists
        if (announcement.pdfLink) {
          try {
            // Extract public_id from Cloudinary URL
            const urlParts = announcement.pdfLink.split("/");
            const publicIdWithExtension = urlParts[urlParts.length - 1];
            const publicId = `announcements/pdfs/${
              publicIdWithExtension.split(".")[0]
            }`;
            await cloudinary.uploader.destroy(publicId, {
              resource_type: "auto",
            });
          } catch (cloudinaryError) {
            console.error(
              "Error deleting old PDF from Cloudinary:",
              cloudinaryError
            );
          }
        }

        const publicId = `announcements/pdfs/announcement_pdf_${Date.now()}`;

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "announcements/pdfs",
          resource_type: "raw",
          type: "authenticated",
          public_id: publicId,
        });

        updateData.pdfLink = result.secure_url;
      } else {
        // Keep existing pdfLink if no new file
        updateData.pdfLink = announcement.pdfLink;
      }
      // Clear other fields
      updateData.content = undefined;
      updateData.urlLink = undefined;
    } else if (typeOfContent === "link") {
      if (!urlLink) {
        return res
          .status(400)
          .json({ message: "URL link is required for link announcements" });
      }
      updateData.urlLink = urlLink;
      // Clear other fields
      updateData.content = undefined;
      updateData.pdfLink = undefined;
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
    console.log("Delete request for announcementId:", announcementId);

    const announcement = await AnnouncementModel.findById(announcementId);
    if (!announcement) {
      console.log("Announcement not found");
      return res.status(404).json({ message: "Announcement not found" });
    }

    // If it's a PDF, delete from Cloudinary first
    if (announcement.typeOfContent === "pdf" && announcement.pdfLink) {
      try {
        console.log(
          "Attempting to delete PDF from Cloudinary:",
          announcement.pdfLink
        );
        // Extract public_id from Cloudinary URL
        const urlParts = announcement.pdfLink.split("/");
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = `announcements/pdfs/${
          publicIdWithExtension.split(".")[0]
        }`;
        await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
        console.log("Cloudinary deletion attempted for:", publicId);
      } catch (cloudinaryError) {
        console.error("Error deleting from Cloudinary:", cloudinaryError);
        // Don't fail the entire operation if Cloudinary deletion fails
      }
    }

    // Delete from database
    const deleted = await AnnouncementModel.findByIdAndDelete(announcementId);
    if (!deleted) {
      console.log("MongoDB deletion failed");
      return res.status(404).json({ message: "Announcement not found in DB" });
    }

    console.log("Announcement deleted from DB:", announcementId);
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
