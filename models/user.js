import mongoose from "mongoose";
import userSchema from "../schemas/user.js";

export const userModel = mongoose.model("users",userSchema);
