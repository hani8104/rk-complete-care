const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Appointment = require('../models/Appointment');

// Initialize Razorpay only if credentials exist to prevent crashing
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
} else {
    console.warn("⚠️ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Payments will not work.");
}

// @route   POST api/payment/create-order
// @desc    Create a Razorpay order for online consultation
router.post('/create-order', async (req, res) => {
    try {
        if (!razorpay) {
            return res.status(500).json({ message: 'Razorpay is not configured on the server.' });
        }
        const { amount, currency = 'INR', receipt = 'receipt_' + Date.now() } = req.body;

        // Razorpay expects amount in paise (1 INR = 100 paise)
        const options = {
            amount: amount * 100, 
            currency,
            receipt
        };

        const order = await razorpay.orders.create(options);
        
        if (!order) {
            return res.status(500).send('Error creating Razorpay order');
        }

        res.json(order);
    } catch (error) {
        console.error('RAZORPAY ORDER ERROR:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   POST api/payment/verify
// @desc    Verify Razorpay payment signature
router.post('/verify', async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        // Verify signature: hmac = crypto.createHmac('sha256', key_secret)
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Payment is successful
            res.json({
                message: 'Payment verified successfully',
                signatureValid: true
            });
        } else {
            res.status(400).json({
                message: 'Invalid payment signature',
                signatureValid: false
            });
        }
    } catch (error) {
        console.error('PAYMENT VERIFICATION ERROR:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;
