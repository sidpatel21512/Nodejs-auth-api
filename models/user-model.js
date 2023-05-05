import mongoose from "mongoose";
import { userSchema } from "../schemas/user-schema.js";

export const user = mongoose.model("users",userSchema);
