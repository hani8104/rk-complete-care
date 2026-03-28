const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const uri = process.env.MONGO_URI;
console.log('Attempting to connect with URI:', uri ? uri.replace(/:([^@]+)@/, ':****@') : 'UNDEFINED');

mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log('✅ MongoDB Connected successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed!');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    if (err.reason) console.error('Reason:', JSON.stringify(err.reason, null, 2));
    process.exit(1);
  });
