import mongoose from "mongoose";
import { hashPassword } from "../../../helper/util";

const UserSchema = new mongoose.Schema({
  avtar: {
    type: String,
    default: null
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    default: null
  },
});

UserSchema.pre("save", async function (next) {
  try {
    const { password } = this;
    if (password) {
      this.password = await hashPassword(password);
      next();
    } else {
      throw new Error("Failed to Hashed password");
    }
  } catch (error) {
    throw new Error("Failed to Save User");
  }
});
export const User = mongoose.model("User", UserSchema);
