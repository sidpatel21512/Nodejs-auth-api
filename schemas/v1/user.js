import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username."],
        unique: [true, "This username already exists."],
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Please provide email address."],
        unique: [true, "This email-id is already in use."],
    },
    password: {
        type: String,
        required: [true, 'Please provide password.'],
        select: false
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['superAdmin','admin','user']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastModifiedAt: {
        type: Date,
        default: Date.now(),
    }
});

export default userSchema;
