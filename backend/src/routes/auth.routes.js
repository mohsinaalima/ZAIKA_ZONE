const express = require('express');
const authController = require("../controllers/auth.controllers.js")
const router = express.Router();


// user auth APIS
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.post('/user/logout', authController.logoutUser)



// food partner auth APIS
router.post('/food-partner/register', authController.registerFoodPartner)
router.post('/food-partner/login', authController.loginFoodPartner)
router.post('/food-partner/logout', authController.logoutFoodPartner)

module.exports = router;
