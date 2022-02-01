
const express = require('express');
const { register, login, logout, forgotPassword, updatePassword, getSingleuser, deleteUser, resetPassword, userProfile, getAllUsers, updateRole, updateProfile } = require('../controllers/User');
const imageUpload = require('../helpers/imageUpload');
const { isAdmin, AuthenticateUser } = require('../middleware/auth');

const router = express.Router();

router.post('/register', imageUpload.single('avatar'), register);
router.get('/userDetails', AuthenticateUser, userProfile);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.post('/logout', AuthenticateUser, logout);
router.put('/update', [imageUpload.single('avatar'), AuthenticateUser], updateProfile);
router.put('/update/password', AuthenticateUser, updatePassword);
router.get('/getAllusers', [AuthenticateUser, isAdmin], getAllUsers)
router.put('/update/role/:id', [AuthenticateUser, isAdmin], updateRole);
router.get('/getSingleuser/:id', [AuthenticateUser, isAdmin], getSingleuser);
router.delete('/delete/:id', [AuthenticateUser, isAdmin], deleteUser);

module.exports = router;