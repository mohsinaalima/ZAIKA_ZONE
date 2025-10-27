const express = require("express");
const foodController = require("../controllers/food.controller.js");
const { authFoodPartnerMiddleware } = require("../middlewares/auth.middleware"); 


const router = express.Router();
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
})

/* POST /api/food  [Protected route - only food partner can access] */
 router.post("/upload-video",
   authFoodPartnerMiddleware,
     upload.single("video"), 
    foodController.createFood);

module.exports = router;

