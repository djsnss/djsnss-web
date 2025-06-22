import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    typeOfContent: {
      type: String,
      enum: ["text", "pdf", "link"],
      required: true,
    },
    content: {
      type: String,
      required: function () {
        return this.typeOfContent === "text";
      },
    },
    pdfLink: {
      type: String,
      required: function () {
        return this.typeOfContent === "pdf";
      },
    },
    urlLink: {
      type: String,
      required: function () {
        return this.typeOfContent === "link";
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
