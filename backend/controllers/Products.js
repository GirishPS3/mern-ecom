const asyncError = require('../helpers/asyncError');
const ErrorHandler = require('../helpers/ErrorHandler');
const APIFeature = require('../helpers/APIFeature');
const Product = require('../models/Products');
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = asyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const product = await Product.create({ ...req.body, user: req.user.id });
  res.status(201).json({ message: 'success', product });

});

exports.getAllProducts = async (req, res, next) => {

  const perPageCount = 8;
  const productsCount = await Product.countDocuments();
  const apiFeature = new APIFeature(Product.find(), req.query).search().filter().pagination(perPageCount);
  const products = await apiFeature.query;
  res.status(200).send({ products, productsCount, perPageCount });

}
exports.adminAllProducts = asyncError(async (req, res, next) => {
  console.log('aa')
  const products = await Product.find();
  res.status(200).send({ products });

})

exports.updateItem = asyncError(async (req, res, next) => {

  const { id } = req.params;
  let product = await Product.find({ id });

  if (!product) {
    return next(new ErrorHandler('Item not found', 400));
  }

  product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, useFindAndModify: false })
  res.status(200).json({ product });

});
exports.deleteItem = asyncError(async (req, res, next) => {
  const { id } = req.params;
  let product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler('Item not found', 400));
  }

  await product.remove();
  res.status(200).json({ message: "deleted succesfully" });

})

exports.productInfo = asyncError(async (req, res, next) => {
  const { id } = req.params;
  let product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler('Item not found', 400));
  }

  res.status(200).json({ product });

})
exports.createReview = asyncError(async (req, res, next) => {
  const { rating, comments } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    comments,
    rating
  };
  const product = await Product.findById(req.params.id);

  const existingUserReviews = product.reviews.find(review => review.user.toString() === req.user._id.toString());
  let avg = 0;
  console.log(existingUserReviews);
  if (existingUserReviews) {
    product.reviews.forEach(rev => {
      if (rev.user.toString() === req.user.id) {
        rev.rating = rating;
        rev.comments = comments;
      }
      avg += rev.rating
    });
    product.rating = avg / product.reviews.length;
  } else {
    product.reviews.push(review);
    product.rating = rating;
  }
  product.noOfReviews = product.reviews.length;

  console.log(product.reviews, 'reviews');
  console.log(product.rating, 'reviews');
  await product.save({ validateBeforeSave: false });

  res.status(200).json(product)

});

exports.getAllReview = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }
  res.status(200).json({ reviews: product.reviews });
});

exports.deleteReview = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }
  const reviews = product.reviews.filter(rev => rev.id.toString() !== req.query.id.toString())
  const noOfReviews = reviews.length;
  let avg = 0;
  reviews.forEach(rev => {
    avg += rev.rating
  });
  let delProduct = await Product.findByIdAndUpdate(req.query.productId, { reviews, noOfReviews, rating: Number(avg / noOfReviews) }, { new: true, runValidators: true, useFindAndModify: false });
  res.send({ message: 'Review deleted', delProduct });
});




//if u use find, then remove method wont be there, so use findbyidanddelete
//