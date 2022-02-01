module.exports = callback => (req, res, next) => {
  return Promise.resolve(callback(req, res, next)).catch(err => {
    console.log(err)

    next(err);
  });

}