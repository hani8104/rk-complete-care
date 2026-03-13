const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rk_care')
    .then(async () => {
        console.log('MongoDB Connected');

        const username = 'admin';
        const password = 'admin123';

        let user = await User.findOne({ username });
        if (!user) {
            console.log('Admin user does not exist. Creating new...');
            user = new User({ username });
        } else {
            console.log('Admin user found. Force resetting password to admin123...');
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log('Password reset successful.');
        process.exit();
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
