const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL or local path
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);
