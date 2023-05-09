import mongoose from "mongoose";
import userSchema from "../../schemas/v1/user.js";

export const userModel = mongoose.model("users", userSchema);
