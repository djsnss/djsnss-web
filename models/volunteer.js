import mongoose from "mongoose";
import validator from "validator";

const volunteerSchema = new mongoose.Schema(
  {
    passportPhoto: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    normalPhoto: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    description: {
      type: String,
      maxlength: 500,
    },
    parentDetails: {
      motherName: {
        type: String,
        required: true,
      },
      fatherName: {
        type: String,
        required: true,
      },
      motherEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new error("Invalid email-id");
          }
        },
      },
      fatherEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new error("Invalid email-id");
          }
        },
      },
    },
    studentDetails: {
      branch: {
        type: String,
        required: true,
      },
      sapId: {
        type: String,
        required: true,
        unique: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new error("Invalid email-id");
          }
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (
          !validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        ) {
          throw new error("Enter a strong password");
        }
      },
      roles: {
        type: [String],
        enum: ["admin", "core", "cocomm", "volunteer", "coordinator"],
        default: ["volunteer"],
      },
      hobbies: {
        type: [String],
        validate: [arrayLimit, "Exactly 2 hobbies required"],
      },
      volunteerHours: {
        type: Number,
        default: 0,
        min: 0,
      },
      connectedEvents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
      ],
    },
  },
  { timestamps: true }
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;