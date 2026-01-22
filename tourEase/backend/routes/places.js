const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const multer = require('multer');
const path = require('path');

// Multer config for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Need to ensure this path exists relative to where server runs
        cb(null, '../uploads/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Multi-file upload for video/image?
// Simplified: Single image upload for now as per schema
// The user schema has 'image' and 'video'. 

// GET all places
router.get('/', async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one place
router.get('/:id', async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) return res.status(404).json({ message: 'Place not found' });
        res.json(place);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create place
// Handling file upload for 'image' field
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
    try {
        // Construct URLs (Assuming serving /uploads statically)
        // req.files['image'][0].path will be like '../uploads/images/filename.jpg'
        // We want to store a relative path or URL for frontend to access

        let imagePath = '';
        if (req.files['image']) {
            imagePath = '/uploads/images/' + req.files['image'][0].filename;
        }

        let videoPath = '';
        if (req.files['video']) {
            // Assuming we save video in videos folder, but my config above put everything in images
            // Let's just keep it simple or fix the destination logic if strict
            // For now, it goes to images folder (or I can fix the config)
            videoPath = '/uploads/images/' + req.files['video'][0].filename;
        }

        const place = new Place({
            name: req.body.name,
            description: req.body.description,
            image: imagePath,
            video: videoPath,
            nearbyAttractions: req.body.nearbyAttractions ? JSON.parse(req.body.nearbyAttractions) : []
        });

        const newPlace = await place.save();
        res.status(201).json(newPlace);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
