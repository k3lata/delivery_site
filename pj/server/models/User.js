const mongoose = require("mongoose");

const savedAddressSchema = new mongoose.Schema(
  {
    label: String,
    city: String,
    street: String,
    house: String,
    apartment: String,
    floor: String,
    doorphone: String,
  },
  { _id: false }
);

const savedCardSchema = new mongoose.Schema(
  {
    id: String,
    label: String,
    holderName: String,
    last4: String,
    expiry: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default: "",
    },
    savedAddresses: [savedAddressSchema],
    savedCards: [savedCardSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);