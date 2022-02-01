const asyncError = require('../helpers/asyncError');
const ErrorHandler = require('../helpers/ErrorHandler');
const Order = require('../models/Order');
const Product = require('../models/Products');

// Create new Order
exports.newOrder = asyncError(async (req, res, next) => {
  const {
    shippingAddress,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalAmount,
    quantity,
  } = req.body;

  const order = await Order.create({
    shippingAddress,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalAmount,
    quantity,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
exports.getSingleOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.myOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get all Orders -- Admin
exports.getAllOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalAmount;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
exports.updateOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.productId, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});