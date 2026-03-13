const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ClinicPoster = require('../models/ClinicPoster');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, 'poster-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET all posters
router.get('/', async (req, res) => {
    try {
        const posters = await ClinicPoster.find().sort({ createdAt: -1 });
        const postersWithUrl = posters.map(p => {
            const obj = p.toObject();
            if (obj.image && !obj.image.startsWith('http')) {
                obj.image = `${req.protocol}://${req.get('host')}/${obj.image}`;
            }
            return obj;
        });
        res.json(postersWithUrl);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new poster
router.post('/', upload.single('image'), async (req, res) => {
    let imagePath = req.body.imageUrl || '';
    if (req.file) imagePath = req.file.path.replace(/\\/g, '/');

    const poster = new ClinicPoster({
        image: imagePath,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category || 'General'
    });

    try {
        const newPoster = await poster.save();
        res.status(201).json(newPoster);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE poster
router.delete('/:id', async (req, res) => {
    try {
        const poster = await ClinicPoster.findById(req.params.id);
        if (!poster) return res.status(404).json({ message: 'Poster not found' });
        await poster.deleteOne();
        res.json({ message: 'Poster deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
