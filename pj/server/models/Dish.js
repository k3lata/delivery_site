const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    category: { type: String, default: 'main' },
    texture: { type: String, default: 'light' },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    image: { type: String, default: '' },
    ingredients: { type: [String], default: [] },
    ingredientKeywords: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Dish', dishSchema);
