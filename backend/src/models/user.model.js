import mongoose from "mongoose";

const User = mongoose.model(
  `User`,
  new mongoose.Schema({
    username: String,
    full_name: {},
    organization: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
      role: {
        type: String,
        enum: ["manager", "customer"],
        default: "customer",
      },
    },
  })
);

export default User;
