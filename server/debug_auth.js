const mongoose = require('mongoose');
require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8']);
const User = require('./models/User');

async function check() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('CONNECTED to DB:', mongoose.connection.name);
        console.log('HOST:', mongoose.connection.host);
        const users = await User.find({});
        console.log('USERS FOUND:', users.map(u => ({ username: u.username, id: u._id })));
        process.exit(0);
    } catch (err) {
        console.error('ERROR:', err);
        process.exit(1);
    }
}

check();
