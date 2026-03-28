const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'rk_care_secret_key_fallback';


// ======================
// 🔐 REGISTER ADMIN
// ======================
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log("REGISTER REQUEST:", req.body);

        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            password: hashedPassword
        });

        await user.save();

        console.log("✅ Admin registered:", username);

        res.status(201).json({ msg: 'Admin registered successfully' });

    } catch (err) {
        console.error("❌ Register Error:", err);
        res.status(500).json({ msg: 'Server Error' });
    }
});


// ======================
// 🔑 LOGIN
// ======================
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log("🔐 LOGIN TRY:", { username, password });

        const user = await User.findOne({ username });

        // 🔍 Debug
        console.log("👤 USER FROM DB:", user);

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("🔑 PASSWORD MATCH:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '8h' },
            (err, token) => {
                if (err) {
                    console.error("JWT Error:", err);
                    return res.status(500).json({ msg: 'Token Error' });
                }

                console.log("✅ LOGIN SUCCESS");

                res.json({ token });
            }
        );

    } catch (err) {
        console.error("❌ Login Error:", err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;