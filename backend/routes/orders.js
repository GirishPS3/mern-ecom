const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/Order");
const router = express.Router();

const { AuthenticateUser, isAdmin } = require("../middleware/auth");

router.post("/order/create", AuthenticateUser, newOrder);

router.get("/order/:id", getSingleOrder);

router.get("/orders/me", myOrders);

router.get("/admin/orders", isAdmin, getAllOrders);

router.put("/admin/order/:id", isAdmin, updateOrder);
router.delete("/admin/order/:id", isAdmin, deleteOrder);

module.exports = router;