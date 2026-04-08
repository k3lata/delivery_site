const Dish = require("../models/Dish");

async function getAllDishes(req, res) {
  try {
    const dishes = await Dish.find().sort({ createdAt: -1 });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения блюд" });
  }
}

async function getDishesByCuisine(req, res) {
  try {
    const { cuisineId } = req.params;
    const dishes = await Dish.find({ cuisine: cuisineId });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения кухни" });
  }
}

module.exports = {
  getAllDishes,
  getDishesByCuisine,
};