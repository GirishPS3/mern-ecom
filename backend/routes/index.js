const { helloWorld, testError } = require('../controllers');
const { AuthenticateUser } = require('../middleware/auth');
const productRoute = require('./Product');
const userRoute = require('./User');
const orderRoute = require('./orders');
const paymentRoute = require('./Payment');
const router = require('express').Router();

//basic routes
router.use('/api/v1/products', productRoute);
router.use('/api/v1/user', userRoute);
router.use('/api/v1/payment', paymentRoute);
router.use('/api/v1/', AuthenticateUser, orderRoute);

router.get('/', helloWorld);


module.exports = router;