const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const dns = require('dns');

// Bypassing ISP DNS issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

console.log('Using URI:', process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 40) + '...' : 'UNDEFINED');
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected to Atlas ✅');

        const username = 'admin';
        const password = 'admin123';

        let user = await User.findOne({ username });
        if (!user) {
            console.log('Admin user does not exist in Atlas. Creating new...');
            user = new User({ username });
        } else {
            console.log('Admin user found in Atlas. Resetting password to admin123...');
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log('Password reset successful on Atlas. 🚀');
        process.exit();
    })
    .catch(err => {
        console.error('Connection Failed ❌:', err.message);
        process.exit(1);
    });
