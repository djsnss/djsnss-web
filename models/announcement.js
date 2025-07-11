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
      index: true,
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
    this.pdfLink = undefined;
    this.urlLink = undefined;
  } else if (this.typeOfContent === "pdf") {
    this.content = undefined;
    this.urlLink = undefined;
  } else if (this.typeOfContent === "link") {
    this.content = undefined;
    this.pdfLink = undefined;
  }
  next();
});

const AnnouncementModel = mongoose.model("Announcement", announcementSchema);

export default AnnouncementModel;
