const express = require('express');
const router = express.Router();
const { sendStripeApiKey, processPayment } = require('../controllers/Payment');

router.get('/stripeApiKey', sendStripeApiKey);
router.post('/process', processPayment);

module.exports = router;
