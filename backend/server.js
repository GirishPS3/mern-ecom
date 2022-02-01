
const dotenv = require('dotenv');
const cloudinary = require("cloudinary");
dotenv.config({ path: './backend/.env' });

const app = require('./app');
const { PORT } = require('./config');
const connectDb = require('./helpers/dbConnect');

connectDb().then(() => {
  console.log('mongodb connection succeded')
  app.listen(PORT, () => {
    console.log('running at localhost:' + PORT)
  });
})
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
process.on('unhandledRejection', (err) => {
  console.log('unhandledRejection', err.message);
  process.exit(1);
})