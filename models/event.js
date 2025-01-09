import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
    type: Date,
    required: true,
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
});

export default mongoose.model("Event", EventSchema);
