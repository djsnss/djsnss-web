import VolunteerModel from "../models/volunteer.js";
import EventModel from "../models/event.js";

// Get feedback for a specific event (only if attended)
const getVolunteerFeedback = async (req, res) => {
  try {
    const eventId = req.params.eventId?.toString();
    if (!eventId) {
      return res.status(400).json({ message: "Event ID missing" });
    }

    const event = await EventModel.findById(eventId).populate(
      "feedback.volunteerId",
      "studentDetails.name studentDetails.email normalPhoto.url"
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    console.log(event.feedback);
    return res.status(200).json(event.feedback);
  } catch (err) {
    console.error("Get Volunteer Feedback Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ADD feedback for an event (only if attended)
const addVolunteerFeedback = async (req, res) => {
  try {
    const volunteerId = req.volunteer?.volunteerId;
    const volunteer = await VolunteerModel.findById(volunteerId);
    if (!volunteer) {
      return res.status(400).json({ message: "Volunteer not found" });
    }
    // console.log(volunteer.connectedEvents);
    const eventId = req.params.eventId?.toString();
    const { feedbackText, rating } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID missing" });
    }

    // basic validation
    if (!feedbackText || typeof feedbackText !== "string") {
      return res.status(400).json({ message: "Feedback Text is required" });
    }
    if (
      (rating < 1 || rating > 5)
    ) {
      return res
        .status(400)
        .json({ message: "Rating must be a number between 1 and 5" });
    }

    const connectedEvents = volunteer.connectedEvents || [];
    const eventConnection = connectedEvents.find(
      (e) => e.eventId.toString() === eventId
    );
    const attended = eventConnection ? eventConnection.attended : false;

    if (!attended) {
      return res.status(403).json({
        message: "You cannot submit feedback — you did not attend this event",
      });
    }

    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const existingFeedback = event.feedback.find((fb) => {
      const fbVolunteerId = fb.volunteerId
        ? fb.volunteerId._id
          ? fb.volunteerId._id.toString()
          : fb.volunteerId.toString()
        : null;
      return fbVolunteerId === volunteerId;
    });

    if (existingFeedback) {
      existingFeedback.feedbackText = feedbackText;
      existingFeedback.rating = rating;
      existingFeedback.submittedAt = new Date();
      await event.save();
      return res
        .status(200)
        .json({ message: "Feedback updated successfully", feedback: existingFeedback });
    } else {
      const newFb = {
        volunteerId,
        feedbackText,
        rating,
        submittedAt: new Date(),
      };
      event.feedback.push(newFb);
      await event.save();
      return res
        .status(201)
        .json({ message: "Feedback added successfully", feedback: newFb });
    }
  } catch (err) {
    console.error("Add Volunteer Feedback Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

//Delete feedback function

const deleteFeedback = async (req, res) => {
  try {
    const eventId = req.params.eventId?.toString();
    const feedbackId =
      req.params.feedbackId ?? req.body?.feedbackId ?? req.query?.feedbackId;
    const volunteerId = req.volunteer?.volunteerId;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID missing" });
    }
    
    if (!feedbackId) {
      return res.status(400).json({ message: "Feedback ID missing" });
    }

    const event = await EventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // find subdocument by id
    const fb = event.feedback.id(feedbackId);
    if (!fb) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // only allow volunteer who created it to delete
    const fbVolunteerId = fb.volunteerId ? fb.volunteerId.toString() : null;
    if (volunteerId && fbVolunteerId !== volunteerId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this feedback" });
    }

    event.feedback.pull({ _id: feedbackId });
    await event.save();

    return res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export { getVolunteerFeedback, addVolunteerFeedback, deleteFeedback };

