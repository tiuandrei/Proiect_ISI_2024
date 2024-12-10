const mongoose = require('mongoose');

const EventSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    timestamp: {
        type: Date,
        required: true,
        unique: true,
    },

    // allows for different schedules for students,
    // each students checks the 'indeces' of the 
    // schedules he's part of (used for optional courses)
    // schedule: {
    //     type: Number,
    //     required: true,
    //     default: 0
    // },

    location: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Event", EventSchema);