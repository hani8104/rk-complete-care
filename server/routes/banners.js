const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');
const multer = require('multer');
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    }
});

const upload = multer({ storage: storage });

// GET all banners
router.get('/', async (req, res) => {
    try {
        const banners = await Banner.find().sort({ createdAt: -1 });
        // Add full URL to image path if it's a local file
        const bannersWithUrl = banners.map(banner => {
            const bannerObj = banner.toObject();
            if (bannerObj.image && !bannerObj.image.startsWith('http')) {
                bannerObj.image = `${req.protocol}://${req.get('host')}/${bannerObj.image}`;
            }
            return bannerObj;
        });
        res.json(bannersWithUrl);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new banner
router.post('/', upload.single('image'), async (req, res) => {
    console.log("POST /api/banners hit");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    let imagePath = req.body.imageUrl; // Default to URL if provided

    if (req.file) {
        imagePath = req.file.path.replace(/\\/g, "/"); // Use uploaded file path (normalize slashes)
    }

    const banner = new Banner({
        image: imagePath,
        title: req.body.title,
        subtitle: req.body.subtitle
    });

    try {
        const newBanner = await banner.save();
        res.status(201).json(newBanner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE banner
router.delete('/:id', async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) return res.status(404).json({ message: 'Banner not found' });

        await banner.deleteOne(); // Use deleteOne() instead of remove()
        res.json({ message: 'Banner deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
