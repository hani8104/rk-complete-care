const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const host = 'rk-complete-care-cluste.9mfm1xy.mongodb.net';
const user = 'rkadmin';
const pass = "password_placeholder"; // We'll replace it in the loop

const variations = [
    "Hani@ssw81rd'04'!", // None
    "Hani%40ssw81rd'04'!", // Only @
    "Hani%40ssw81rd%2704%27%21", // All
    "Hani@ssw81rd%2704%27%21", // Everything but @ (impossible but testing)
];

async function test() {
    for (const v of variations) {
        // Note: we don't encode v again, we assume it's already encoded as intended
        const uri = `mongodb+srv://${user}:${v}@${host}/rk_complete_care?retryWrites=true&w=majority`;
        console.log(`TESTING encoding variation: ${v}`);
        try {
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
            console.log('SUCCESS with variation:', v);
            process.exit(0);
        } catch (e) {
            console.log('FAIL:', e.message);
            await mongoose.disconnect();
        }
    }
    console.log('ALL VARIATIONS FAILED ❌');
    process.exit(1);
}
test();
