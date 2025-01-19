import mongoose from "mongoose";
import validator from 'validator';  

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email-id");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Admin", AdminSchema);
