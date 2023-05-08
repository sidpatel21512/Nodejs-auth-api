import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username."],
        unique: [true, "This username already exists."],
    },
    email: {
        type: String,
        required: [true, "Please provide email address."],
        unique: [true, "This email-id is already in use."],
    },
    password: {
        type: String,
        minLength: [5, "Password is too short!"],
        required: [true, 'Please provide password.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastModifiedAt: {
        type: Date,
        required: true
    }
});

export default userSchema;
