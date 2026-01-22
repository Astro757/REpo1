const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().populate('userId', 'name'); // Show user name
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create review
router.post('/', async (req, res) => {
    try {
        const review = new Review({
            userId: req.body.userId,
            placeId: req.body.placeId,
            rating: req.body.rating,
            comment: req.body.comment
        });
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
