const express = require("express");
const { getAllOrders, updateOrderStatus } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/orders", authMiddleware, adminMiddleware, getAllOrders);
router.patch("/orders/:orderId/status", authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;