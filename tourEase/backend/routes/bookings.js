const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// GET bookings for a user
router.get('/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId }).populate('placeId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create booking
router.post('/', async (req, res) => {
    try {
        const booking = new Booking({
            userId: req.body.userId,
            placeId: req.body.placeId,
            type: req.body.type,
            date: req.body.date,
            status: 'Confirmed', // Auto confirm for demo
            paymentDetails: req.body.paymentDetails
        });
        const newBooking = await booking.save();

        // Bonus: Send Email (Placeholder)
        // sendConfirmationEmail(booking);

        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
