const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'server', '.env') });
const dns = require('dns');
dns.setServers(['8.8.8.8']);
const User = require('./server/models/User');

async function check() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('CONNECTED to:', mongoose.connection.name);
        const users = await User.find({});
        console.log('USERS COUNT:', users.length);
        console.log('USERS:', JSON.stringify(users.map(u => ({ username: u.username })), null, 2));
        process.exit(0);
    } catch (err) {
        console.error('ERROR:', err);
        process.exit(1);
    }
}

check();
