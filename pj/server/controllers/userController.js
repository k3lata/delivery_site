const Order = require("../models/Order");
const User = require("../models/User");

async function getProfile(req, res) {
  res.json(req.user);
}

async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения заказов" });
  }
}

async function addSavedAddress(req, res) {
  try {
    const { label, city, street, house, apartment, floor, doorphone } = req.body;

    if (!city || !street || !house) {
      return res.status(400).json({ message: "Укажи город, улицу и дом" });
    }

    const user = await User.findById(req.user._id);

    user.savedAddresses.push({
      label: label || "Новый адрес",
      city: city || "",
      street,
      house: house || "",
      apartment: apartment || "",
      floor: floor || "",
      doorphone: doorphone || "",
    });

    await user.save();

    res.status(201).json({ savedAddresses: user.savedAddresses });
  } catch (error) {
    console.error("SAVE ADDRESS ERROR:", error);
    res.status(500).json({ message: "Ошибка сохранения адреса" });
  }
}

async function addSavedCard(req, res) {
  try {
    const { label, holderName, cardNumber, expiry } = req.body;

    if (!label || !holderName || !cardNumber || !expiry) {
      return res.status(400).json({ message: "Заполни все поля карты" });
    }

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      return res.status(400).json({ message: "Номер карты должен содержать 16 цифр" });
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      return res.status(400).json({ message: "Срок действия должен быть в формате MM/YY" });
    }

    const last4 = cardNumber.replace(/\s/g, "").slice(-4);

    const user = await User.findById(req.user._id);

    user.savedCards.push({
      id: `${Date.now()}`,
      label: label || "Карта",
      holderName: holderName || "",
      last4,
      expiry: expiry || "",
    });

    await user.save();

    res.status(201).json({ savedCards: user.savedCards });
  } catch (error) {
    console.error("SAVE CARD ERROR:", error);
    res.status(500).json({ message: "Ошибка сохранения карты" });
  }
}

async function uploadAvatar(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Файл не выбран" });
    }

    const user = await User.findById(req.user._id);
    user.avatar = `/uploads/${req.file.filename}`;
    await user.save();

    return res.json({
      message: "Аватар успешно загружен",
      avatar: user.avatar,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("UPLOAD AVATAR ERROR:", error);
    return res.status(500).json({ message: "Ошибка загрузки аватара" });
  }
}

module.exports = {
  getProfile,
  getMyOrders,
  addSavedAddress,
  addSavedCard,
  uploadAvatar,
};