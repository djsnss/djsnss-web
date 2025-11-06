import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    default: "",
  },
  description: {
    type: String,
  },
  longDescription: {
    type: String,
    default: "",
  },
  photo: {
    url: {
      type: String,
      default: "",
    },
    public_id: {
      type: String,
      default: "",
    },
  },
  startHours: {
    type: Number,
  },
  endHours: {
    type: Number,
  },
  TotalNoOfHours: {
    type: Number,
    required: true,
  },
  date: {
    type: mongoose.Schema.Types.Mixed, // Accepts Date or String
    default: "TBD",
  },
  location: {
    type: String,
    required: true,
  },
  maxVolunteers: {
    type: Number,
    default: 50,
  },
  registeredVolunteers: [
    {
      volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Volunteer",
      },
      registeredAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  status: {
    type: String,
    enum: ["Upcoming", "Ongoing", "Past"],
    required: true,
  },
  scope: {
    type: String,
    enum: ["Local", "Area", "University"],
    required: true,
  },
  attendance: [
    {
      volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" },
      attended: { type: Boolean, default: false },
    },
  ],

  feedback: [
    {
      volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Volunteer",
        required: true,
      },
      feedbackText: {
        type: String,
        required: true,
        trim: true,
      },
      rating: {
        type: Number,
        default: 5,
      },
      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  related_images: [
    {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    }
  ],
});
const Event = mongoose.model("Event", EventSchema);

export default Event;
