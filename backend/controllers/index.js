const asyncError = require("../helpers/asyncError");

module.exports = {
  helloWorld: (req, res, next) => {
    res.send('Hello world')
  },
  testError: asyncError(async (req, res, next) => {

    throw new Error('testing')
  })
}