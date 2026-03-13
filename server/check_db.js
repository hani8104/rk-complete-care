const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/rk_care')
    .then(async () => {
        console.log('MongoDB Connected');
        const users = await User.find({});
        console.log('Users found:', users);
        process.exit();
    })
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });
