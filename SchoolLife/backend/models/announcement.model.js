const mongoose = require('mongoose');

const AnnouncementSchema =  new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    timestamp: {
        type: Date,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    }, 

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);