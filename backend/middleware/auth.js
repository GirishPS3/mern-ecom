const { JWTData } = require("../helpers");
const ErrorHandler = require("../helpers/ErrorHandler");
const User = require("../models/User");

const AuthenticateUser = async (req, res, next) => {
  let token = req.headers['authorization'] || req.cookies.token;
  if (!token) {
    return next(new ErrorHandler('user is not authenticated', 401))
  }
  console.log(token);
  const userDAta = JWTData().verifyToken(token);
  const user = await User.findById(userDAta.id);
  if (!user) {
    return next(new ErrorHandler('user not found', 400))
  };
  req.user = user;
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("user is doesn't have permission to perform this action", 400));
  }
  next();
};
module.exports = {
  isAdmin,
  AuthenticateUser
};