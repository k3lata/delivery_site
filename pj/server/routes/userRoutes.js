const express = require("express");
const {
  getProfile,
  getMyOrders,
  addSavedAddress,
  addSavedCard,
  uploadAvatar,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, getProfile);
router.get("/my-orders", authMiddleware, getMyOrders);
router.post("/addresses", authMiddleware, addSavedAddress);
router.post("/cards", authMiddleware, addSavedCard);
router.post("/avatar", authMiddleware, upload.single("avatar"), uploadAvatar);

module.exports = router;