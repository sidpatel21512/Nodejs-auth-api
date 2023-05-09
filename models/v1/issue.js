import mongoose from "mongoose";
import issueSchema from '../../schemas/v1/issue.js'

export const issueModel = mongoose.model("issues", issueSchema);
