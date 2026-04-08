const Order = require('../models/Order');

function isValidDeliveryTime(deliveryTime) {
  if (!deliveryTime || !/^\d{2}:\d{2}$/.test(deliveryTime)) {
    return false;
  }

  const [hours, minutes] = deliveryTime.split(':').map(Number);

  const selected = new Date();
  selected.setHours(hours, minutes, 0, 0);

  const minAllowed = new Date();
  minAllowed.setMinutes(minAllowed.getMinutes() + 30);
  minAllowed.setSeconds(0, 0);

  return selected.getTime() >= minAllowed.getTime();
}

async function createOrder(req, res) {
  try {
    const {
      items,
      totalPrice,
      address,
      deliveryTime,
      paymentMethod,
      comment,
      paymentCardId,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Корзина пуста' });
    }

    if (!address || !String(address).trim()) {
      return res.status(400).json({ message: 'Укажи адрес доставки' });
    }

    if (!deliveryTime) {
      return res.status(400).json({ message: 'Укажи время доставки' });
    }

    if (!isValidDeliveryTime(deliveryTime)) {
      return res.status(400).json({
        message: 'Минимальное время заказа — не раньше чем через 30 минут',
      });
    }

    const invalidItem = items.find(
      (item) =>
        !item.dishId ||
        !item.name ||
        Number(item.price) <= 0 ||
        Number(item.quantity) <= 0
    );

    if (invalidItem) {
      return res.status(400).json({ message: 'Один из товаров заполнен некорректно' });
    }

    if (!totalPrice || Number(totalPrice) <= 0) {
      return res.status(400).json({ message: 'Некорректная сумма заказа' });
    }

    if (!['cash', 'card', 'online'].includes(paymentMethod)) {
      return res.status(400).json({ message: 'Некорректный способ оплаты' });
    }

    if ((paymentMethod === 'card' || paymentMethod === 'online') && !paymentCardId) {
      return res.status(400).json({ message: 'Выбери карту для оплаты' });
    }

    const order = await Order.create({
      userId: req.user._id,
      items,
      totalPrice,
      address: String(address).trim(),
      deliveryTime,
      paymentMethod,
      paymentCardId: paymentCardId || '',
      comment: String(comment || '').trim(),
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('CREATE ORDER ERROR:', error);
    res.status(500).json({
      message: 'Ошибка создания заказа',
      error: error.message,
    });
  }
}

module.exports = {
  createOrder,
};