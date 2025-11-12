// server/models/bug.model.js

const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'resolved', 'closed'],
        default: 'open'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    // Optional: Keep track of creation and update times
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Bug = mongoose.model('Bug', bugSchema);
module.exports = Bug;