const express = require('express');
const router = express.Router();
const Guide = require('../models/Guide');

// GET guides (filter by gender if query param exists)
router.get('/', async (req, res) => {
    try {
        let query = {};
        if (req.query.gender) {
            // Case insensitive match
            query.gender = { $regex: new RegExp(req.query.gender, "i") };
        }
        if (req.query.placeId) {
            query.placeId = req.query.placeId;
        }

        const guides = await Guide.find(query).populate('placeId');
        res.json(guides);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create guide
router.post('/', async (req, res) => {
    try {
        const guide = new Guide(req.body);
        const newGuide = await guide.save();
        res.status(201).json(newGuide);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
