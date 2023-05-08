import mongoose from "mongoose";
import issueSchema from '../schemas/issue.js'

export const issueModel = mongoose.model("issues",issueSchema);
