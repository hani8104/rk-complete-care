const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const hosts = ['rk-complete-care-cluste.9mfm1xy.mongodb.net', 'rk-complete-care-cluster.9mfm1xy.mongodb.net'];
const users = ['rkadmin', 'hanipathak8104', 'hanipathak8104@gmail.com'];
const pass = 'Hani@7737';

async function test() {
    for (const host of hosts) {
        for (const user of users) {
             const uri = `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}/rk_complete_care?retryWrites=true&w=majority`;
             console.log(`TESTING: ${user} on ${host}`);
             try {
                 await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
                 console.log('SUCCESS!!! User is:', user, 'Host is:', host);
                 process.exit(0);
             } catch (e) {
                 console.log('FAILED:', e.message);
                 await mongoose.disconnect();
             }
        }
    }
    console.log('ALL COMBINATIONS FAILED ❌');
    process.exit(1);
}
test();
