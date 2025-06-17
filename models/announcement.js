import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    typeOfContent: {
      type: String,
      enum: ["text", "pdf"],
      required: true,
    },
    content: {
      type: String,
      required: function () {
        return this.typeOfContent === "text";
      },
    },
    link: {
      type: String,
      required: function () {
        return this.typeOfContent === "pdf";
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isNew: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// Clean up fields during save
announcementSchema.pre("save", function (next) {
  if (this.typeOfContent === "text") {
    this.link = undefined; // Clear link for text type
  } else if (this.typeOfContent === "pdf") {
    this.content = undefined; // Clear content for pdf type
  }
  next();
});

const AnnouncementModel = mongoose.model("Announcement", announcementSchema);

export default AnnouncementModel;
