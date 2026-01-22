const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    type: {
        type: String,
        enum: ['Hotel', 'Bus', 'Package', 'Ticket'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Confirmed', 'Cancelled']
    },
    paymentDetails: {
        // Simplified for placeholder
        method: String,
        amount: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
