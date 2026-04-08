const express = require("express");
const { getAllDishes, getDishesByCuisine } = require("../controllers/dishController");

const router = express.Router();

router.get("/", getAllDishes);
router.get("/cuisine/:cuisineId", getDishesByCuisine);

module.exports = router;