const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const initialRoute = require('./routes');
const ErrorHandler = require('./helpers/ErrorHandler');

//configurations
app.use(express.json()); // to access json body data
app.use(express.static('./backend/images'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // to configure cors
app.use(helmet()); // to add secure request headers
app.use(morgan('combined')); //to log requests
app.use(cookieParser())
// routes
app.use(initialRoute);

//error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  //mongodb casterror handler
  if (err.name === "CastError") {
    err = new ErrorHandler('Resource Not found', 400);
  }

  res.status(err.statusCode).json({ message: err.message, success: false })
})

module.exports = app;