import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    at: {
        type: Date,
        default: Date.now(),
    }
})

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
        username: {
            type: String,
            required: false,
        },
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
        username: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    activity: {
        type: [activitySchema],
        default: []
    }
});

export default issueSchema;
