const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:5001/api/clinic-posters';

async function testUploadWithoutImage() {
    console.log("Testing upload WITHOUT image...");
    const form = new FormData();
    form.append('title', 'Test No Image');
    form.append('category', 'General');

    try {
        const res = await axios.post(API_URL, form, {
            headers: form.getHeaders()
        });
        console.log("Success (Unexpected):", res.status, res.data);
    } catch (err) {
        console.log("Failed (Expected):", err.response ? err.response.data : err.message);
    }
}

async function testUploadWithFile() {
    console.log("\nTesting upload WITH file...");
    const filePath = path.join(__dirname, 'test_poster.txt');
    fs.writeFileSync(filePath, 'dummy image content');

    const form = new FormData();
    form.append('title', 'Test With File');
    form.append('category', 'General');
    form.append('image', fs.createReadStream(filePath));

    try {
        const res = await axios.post(API_URL, form, {
            headers: form.getHeaders()
        });
        console.log("Success:", res.status, res.data);

        // Clean up
        if (res.data._id) {
            await axios.delete(`${API_URL}/${res.data._id}`);
            console.log("Cleaned up created poster.");
        }
    } catch (err) {
        console.log("Failed:", err.response ? err.response.data : err.message);
    } finally {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
}

async function testUploadWithUrl() {
    console.log("\nTesting upload WITH URL...");
    const form = new FormData();
    form.append('title', 'Test With URL');
    form.append('category', 'General');
    form.append('imageUrl', 'https://example.com/poster.jpg');

    try {
        const res = await axios.post(API_URL, form, {
            headers: form.getHeaders()
        });
        console.log("Success:", res.status, res.data);

        // Clean up
        if (res.data._id) {
            await axios.delete(`${API_URL}/${res.data._id}`);
            console.log("Cleaned up created poster.");
        }
    } catch (err) {
        console.log("Failed:", err.response ? err.response.data : err.message);
    }
}

async function run() {
    await testUploadWithoutImage();
    await testUploadWithFile();
    await testUploadWithUrl();
}

run();
