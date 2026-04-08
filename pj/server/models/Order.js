const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    dishId: { type: String, required: true },
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: String,
      required: true,
    },
    paymentCardId: {
      type: String,
      default: '',
    },
    paymentCardId: {
      type: String,
      default: "",
    },
    comment: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "cooking", "on_the_way", "delivered", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);