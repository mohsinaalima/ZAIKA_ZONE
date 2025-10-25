const express = require("express");
const foodController = require("../controllers/food.controller.js");
const { authFoodPartnerMiddleware } = require("../middlewares/auth.middleware"); // ✅ fix here

const router = express.Router();

/* POST /api/food  [Protected route - only food partner can access] */
// router.post("/", authFoodPartnerMiddleware, foodController.createFood);

module.exports = router;

