const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET booked slots for a specific date
router.get('/booked-slots', async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ message: "Date is required" });

        // Create start and end of the given date for range query
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        const appointments = await Appointment.find({
            date: { $gte: start, $lte: end }
        });
        const bookedSlots = appointments.map(app => app.slot);
        res.json(bookedSlots);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all appointments (with optional search)
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { patientName: { $regex: search, $options: 'i' } },
                    { appointmentId: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const appointments = await Appointment.find(query).sort({ date: -1, createdAt: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new appointment
router.post('/', async (req, res) => {
    try {
        // Generate Appointment ID
        const today = new Date();
        const year = today.getFullYear();

        // Find last appointment of the current year to increment sequence
        const lastAppointment = await Appointment.findOne({
            appointmentId: { $regex: `^RK-${year}-` }
        }).sort({ appointmentId: -1 });

        let sequence = 1;
        if (lastAppointment && lastAppointment.appointmentId) {
            const parts = lastAppointment.appointmentId.split('-');
            sequence = parseInt(parts[2]) + 1;
        }

        const appointmentId = `RK-${year}-${String(sequence).padStart(4, '0')}`;

        const appointment = new Appointment({
            appointmentId,
            patientName: req.body.patientName,
            age: req.body.age,
            gender: req.body.gender,
            phone: req.body.phone,
            date: req.body.date,
            slot: req.body.slot,
            time: req.body.time,
            problem: req.body.problem,
            clinicVisit: req.body.clinicVisit,
            videoConsultation: req.body.videoConsultation,
            notes: req.body.notes
        });

        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH update appointment details
router.patch('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        const fieldsToUpdate = [
            'patientName', 'age', 'gender', 'phone',
            'date', 'slot', 'time', 'problem',
            'clinicVisit', 'videoConsultation', 'notes', 'status'
        ];

        fieldsToUpdate.forEach(field => {
            if (req.body[field] !== undefined) {
                appointment[field] = req.body[field];
            }
        });

        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE appointment
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Appointment.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Appointment not found' });
        res.json({ message: 'Appointment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
