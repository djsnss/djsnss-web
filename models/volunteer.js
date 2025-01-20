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
            throw new Error("Invalid email-id");
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
            throw new Error("Invalid email-id");
          }
        },
      },
    },
    studentDetails: {
      name: {
        type: String,
        required: true,
      },
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
            throw new Error("Invalid email-id");
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
          throw new Error("Enter a strong password");
        }
      },
    },
    roles: {
      type: [String],
      enum: ["core", "cocomm", "volunteer", "coordinator"],
      default: ["volunteer"],
    },
    hobbies: {
      type: [String],
      default: [],
    },
    volunteerHours: {
      type: Number,
      default: 0,
      min: 0,
    },
    connectedEvents: [
      {
        eventId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
        attended: {
          type: Boolean,
          default: false,
        },
        hoursCompleted: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;
