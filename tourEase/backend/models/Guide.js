const mongoose = require('mongoose');

const GuideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    contact: {
        type: String, // Email or Phone
        required: true
    },
    image: {
        type: String, // Path to profile image
        default: 'uploads/images/default-guide.png'
    },
    bio: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Guide', GuideSchema);
