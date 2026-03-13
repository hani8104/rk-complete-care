const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rk_care')
    .then(async () => {
        console.log('MongoDB Connected');

        const username = 'admin';
        const password = 'admin123';

        // Check if admin exists
        let user = await User.findOne({ username });
        if (user) {
            console.log('Admin user already exists');
            process.exit();
        }

        // Create Admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            password: hashedPassword
        });

        await user.save();
        console.log(`Admin created successfully.\nUsername: ${username}\nPassword: ${password}`);
        process.exit();
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
