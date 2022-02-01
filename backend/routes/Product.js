const { getAllProducts, createProduct, updateItem, adminAllProducts, deleteItem, getAllReview, productInfo, createReview, deleteReview } = require('../controllers/Products');

const express = require('express');
const { isAdmin, AuthenticateUser } = require('../middleware/auth');
const router = express.Router();
const imageUpload = require('../helpers/imageUpload');

router.post('/create', [AuthenticateUser, imageUpload.single('images'), isAdmin,], createProduct);
router.get('/:id', productInfo);
router.get('/', getAllProducts);
router.get('/admin/all', [AuthenticateUser, isAdmin], adminAllProducts);
router.put('/:id', [AuthenticateUser, isAdmin, imageUpload.single('images')], updateItem);
router.delete('/delete-reviews', deleteReview);
router.put('/review/:id', AuthenticateUser, createReview);
router.get('/reviews/:id', AuthenticateUser, getAllReview);
router.delete('/:id', [AuthenticateUser, isAdmin], deleteItem);

module.exports = router;