const multer = require('multer');
const path = require('path');


const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: path.join('./backend/images'),
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now()
      + path.extname(file.originalname))
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  }
});


module.exports = imageUpload;