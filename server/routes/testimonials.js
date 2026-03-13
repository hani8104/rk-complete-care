const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// GET all testimonials
router.get('/', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new testimonial
router.post('/', async (req, res) => {
    const testimonial = new Testimonial({
        name: req.body.name,
        location: req.body.location,
        message: req.body.message,
        rating: req.body.rating,
        isReviewLink: req.body.isReviewLink || false
    });

    try {
        const newTestimonial = await testimonial.save();
        res.status(201).json(newTestimonial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE testimonial
router.delete('/:id', async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

        await testimonial.deleteOne();
        res.json({ message: 'Testimonial deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
