import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Task', 'Epic', 'Bug', 'Subtask'],
        default: 'Task',
    },
    priority: {
        type: String,
        enum: ['Minor', 'Major', 'Critical', 'Low', 'High'],
        default: 'Low',
    },
    status: {
        type: String,
        enum: ['Backlog', 'In Progress', 'Done', 'Closed', 'Scoping'],
        default: 'Backlog',
    },
    assignor: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastModifiedAt: {
        type: Date,
        default: Date.now(),
    },
    createdBy: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }
});

export default issueSchema;
