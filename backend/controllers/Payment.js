const asyncError = require('../helpers/asyncError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = asyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'inr',
    metadata: {
      company: "React Ecommerce test"
    }
  })
  res.status(200).json({ success: true, client_secret: myPayment.client_secret })
});

exports.sendStripeApiKey = asyncError(async (req, res, next) => {

  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY })
});