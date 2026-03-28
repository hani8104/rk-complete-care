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
    console.log("RAZORPAY: Initialized successfully ✅");
} else {
    console.warn("⚠️ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Payments will not work.");
}

// ✅ Diagnostic route to check if keys are loaded (without exposing them)
router.get('/config-check', (req, res) => {
    res.json({
        keyIdPresent: !!process.env.RAZORPAY_KEY_ID,
        keySecretPresent: !!process.env.RAZORPAY_KEY_SECRET,
        razorpayInitialized: !!razorpay,
        env: process.env.NODE_ENV || 'development'
    });
});

// @route   POST api/payment/create-order
// @desc    Create a Razorpay order for online consultation
router.post('/create-order', async (req, res) => {
    try {
        if (!razorpay) {
            console.error('RAZORPAY: Attempted to create order but SDK not initialized');
            return res.status(500).json({ message: 'Razorpay is not configured on the server.' });
        }

        const { amount, currency = 'INR', receipt = 'receipt_' + Date.now() } = req.body;
        console.log('RAZORPAY: Request received for amount:', amount);

        // Razorpay expects amount in paise (1 INR = 100 paise)
        const options = {
            amount: Number(amount) * 100, 
            currency,
            receipt
        };

        console.log('RAZORPAY: Creating order with options:', options);
        const order = await razorpay.orders.create(options);
        
        if (!order) {
            console.error('RAZORPAY: Order creation returned null');
            return res.status(500).json({ message: 'Error creating Razorpay order' });
        }

        console.log('RAZORPAY: Order created successfully:', order.id);
        res.json(order);
    } catch (error) {
        console.error('RAZORPAY ORDER ERROR:', error);
        res.status(500).json({ 
            message: 'Razorpay Order Error', 
            error: error.message,
            description: error.description || 'Check your Razorpay dashboard for details'
        });
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

        if (!process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({ message: 'Secret key missing for verification' });
        }

        // Verify signature: hmac = crypto.createHmac('sha256', key_secret)
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            console.log('RAZORPAY: Payment signature verified ✅');
            res.json({
                message: 'Payment verified successfully',
                signatureValid: true
            });
        } else {
            console.error('RAZORPAY: Invalid payment signature ❌');
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
