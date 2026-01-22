const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // Path to image
        required: true
    },
    video: {
        type: String, // Path to video (optional)
    },
    nearbyAttractions: [
        {
            name: String,
            distance: String
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Place', PlaceSchema);
