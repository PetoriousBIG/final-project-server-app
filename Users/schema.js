import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String},
    password: { type: String, required: true },
    firstName: String,
    email: {type: String, required: true, unique: true},
    lastName: String,
    dob: Date,
    role: {
      type: String,
      enum: ["User", "Chef", "Owner"],
      default: "User",
    },
    loginId: String,
    lastActivity: Date,
    totalActivity: String,
  },
  { collection: "users" }
);
export default userSchema;