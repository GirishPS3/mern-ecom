const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET_KEY } = require("../config");

function JWTData() {
  function getToken(data) {
    return jwt.sign(data, JWT_SECRET_KEY, { algorithm: 'RS256', expiresIn: '1h' });
  }
  function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET_KEY);
  }
  return { getToken, verifyToken };
}

function encryptPassword() {
  function hash(pwd) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pwd, salt);
  }
  function verifyPwd(pwd, hash) {
    return bcrypt.compareSync(pwd, hash)
  }
  return { hash, verifyPwd }
}

module.exports = { JWTData, encryptPassword }