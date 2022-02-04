const ErrorHandler = require('../helpers/ErrorHandler');
const APIFeature = require('../helpers/APIFeature');
const asyncError = require('../helpers/asyncError');
const crypto = require('crypto');
const User = require('../models/User');
const Products = require('../models/Products');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary');
const sendEmail = require('../helpers/sendMail');

const sendToken = (res, user, statusCode) => {
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 100,
    ),
    httpOnly: true,
  };
  const token = user.getJWTToken();

  res.status(statusCode).cookie('token', token, options).json({ user, token });
};

exports.register = asyncError(async (req, res) => {
  const cloudImage = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'avatars',
    width: 150,
    crop: 'scale',
  });
  const { email, name, password } = req.body;
  const user = await User.create({
    email,
    name,
    password,
    avatar: {
      public_id: cloudImage.public_id,
      url: cloudImage.secure_url,
    },
  });
  sendToken(res, user, 201);
});

exports.login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('User Not found', 400));
  }

  const isValidPwd = await user.comparePassword(password);

  if (!isValidPwd) {
    return next(new ErrorHandler('Invalid Credentials', 400));
  }

  sendToken(res, user, 200);
});

exports.logout = asyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ sucess: true, message: 'user logged out' });
});
exports.forgotPassword = asyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }
  let resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.hostname}/api/v1/user/resetpassword/${resetToken}`;
  const message = `your password reset token is ${resetPasswordUrl} \n\n If you haven't requested this then, please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Ecommerce Forgot password',
      message,
    });
    res.status(200).json({
      messsage: 'email sent succesfully',
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = asyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new ErrorHandler('token has been expired or invalid', 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('password doesnt match', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(res, user, 201);
});

exports.userProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  res.status(200).json({ user });
});

exports.updateProfile = asyncError(async (req, res, next) => {
  const updatedData = {
    email: req.body.email,
    name: req.body.name,
  };
  {
    /*let oldFile = req.user.avatar.url;

  if (!(oldFile === updatedData.avatar.url)) {
    fs.unlink(path.join('./backend/images', oldFile), (err) => {
      if (err) console.log(err);
      else console.log('deleted successfully')
    })
  }*/
  }
  if (req.body.avatar !== '') {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale',
    });

    updatedData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
    runValidators: true,
    UseFindAndModify: false,
  });
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }
  res.status(200).send({ success: true, user });
});
exports.updatePassword = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }
  const isPwdMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPwdMatched) {
    return next(new ErrorHandler('old password is incorrect', 404));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler('password does not match', 404));
  }

  user.password = req.body.newPassword;
  await user.save({ validateBeforeSave: false });

  sendToken(res, user, 201);
});

exports.updateRole = asyncError(async (req, res, next) => {
  const updatedData = {
    email: req.body.email,
    name: req.body.name,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
    runValidators: true,
    UseFindAndModify: false,
  });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }
  res.status(200).send({ success: true, message: 'User Updated' });
});

exports.getAllUsers = asyncError(async (req, res, next) => {
  const user = await User.find({});
  res.status(200).send(user);
});
exports.getSingleuser = asyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  res.status(200).send(user);
});
exports.deleteUser = asyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }
  user.remove();
  res.status(200).send({ message: 'user deleted' });
});
