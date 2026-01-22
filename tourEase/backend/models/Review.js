const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place', // Optional if the review is general, but specs said dropdown to select place
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
