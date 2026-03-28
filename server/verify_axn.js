const mongoose = require('mongoose');

// The one that worked before
const AXN_URI = "mongodb://hanipathak8104_db_user:TYq3NlwRbsq8YxpJ@ac-3r8tlx-shard-00-00.axxnaha.mongodb.net:27017,ac-3r8tlx-shard-00-01.axxnaha.mongodb.net:27017,ac-3r8tlx-shard-00-02.axxnaha.mongodb.net:27017/rkcare?ssl=true&replicaSet=atlas-10akii-shard-0&authSource=admin&retryWrites=true&w=majority";

console.log("Testing AXN Cluster...");

mongoose.connect(AXN_URI)
.then(() => {
    console.log("SUCCESS: AXN Connected ✅");
    process.exit(0);
})
.catch((err) => {
    console.error("FAILURE: AXN Connection error ❌", err.message);
    process.exit(1);
});
