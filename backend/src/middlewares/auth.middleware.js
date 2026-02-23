// src/middlewares/auth.middleware.js

const foodPartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies ? req.cookies.token : null;
  if (!token) return res.status(401).json({ message: "Please login first" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👮 Only allow 'partner' role
    if (decoded.role !== "partner") {
      return res
        .status(403)
        .json({ message: "Access denied: Food Partners only" });
    }

    const foodPartner = await foodPartnerModel.findById(decoded.id);
    if (!foodPartner)
      return res.status(401).json({ message: "Partner not found" });

    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Please login first" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👮 Only allow 'user' role
    if (decoded.role !== "user") {
      return res.status(403).json({ message: "Access denied: Users only" });
    }

    const user = await userModel.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

const foodModel = require("../models/food.model");
const likeModel = require("../models/like.model");
const saveModel = require("../models/save.model");
const commentModel = require("../models/comment.model"); // ✅ added for comment feature
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

// ===============================
// ✅ Create a new Food Item
// ===============================
async function createFood(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid(),
    );

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "Food created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("Error creating food:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// ===============================
// ✅ Get all Food Items
// ===============================
async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel
      .find({})
      .populate("foodPartner", "name email"); // ✅ added population for clarity

    res.status(200).json({
      message: "Food items fetched successfully",
      foodItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// ===============================
// ✅ Like or Unlike a Food
// ===============================
async function likeFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
      user: user._id,
      food: foodId,
    });

    if (isAlreadyLiked) {
      await likeModel.deleteOne({ user: user._id, food: foodId });
      await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
      return res.status(200).json({ message: "Food unliked successfully" });
    }

    const like = await likeModel.create({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });

    res.status(201).json({ message: "Food liked successfully", like });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// ===============================
// ✅ Save or Unsave a Food
// ===============================
async function saveFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId,
    });

    if (isAlreadySaved) {
      await saveModel.deleteOne({ user: user._id, food: foodId });
      await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: -1 } });
      return res.status(200).json({ message: "Food unsaved successfully" });
    }

    const save = await saveModel.create({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: 1 } });

    res.status(201).json({ message: "Food saved successfully", save });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// ===============================
// ✅ Get Saved Foods for a User
// ===============================
async function getSaveFood(req, res) {
  try {
    const user = req.user;
    const savedFoods = await saveModel
      .find({ user: user._id })
      .populate("food");

    if (!savedFoods || savedFoods.length === 0) {
      return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
      message: "Saved foods retrieved successfully",
      savedFoods,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// ===============================
// ✅ Add Comment to Food
// ===============================
async function addComment(req, res) {
  try {
    const { foodId, text } = req.body;
    const user = req.user;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const comment = await commentModel.create({
      user: user._id,
      food: foodId,
      text,
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// ===============================
// ✅ Get Comments for a Food
// ===============================
async function getComments(req, res) {
  try {
    const { foodId } = req.params;

    const comments = await commentModel
      .find({ food: foodId })
      .populate("user", "name email");

    res.status(200).json({
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSaveFood,
  addComment,
  getComments,
};

async function authOptionalMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;

    // 1. If no token, they are just a guest. Move to the next step! 👤
    if (!token) {
      return next();
    }

    // 2. If there is a token, try to read it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach the correct person to the request based on their role
    if (decoded.role === "user") {
      req.user = await userModel.findById(decoded.id);
    } else if (decoded.role === "partner") {
      req.foodPartner = await foodPartnerModel.findById(decoded.id);
    }

    next();
  } catch (err) {
    // 4. Even if the token is "bad" or expired, don't crash. Just treat as guest.
    console.log("Optional Auth: Invalid token, proceeding as guest");
    next();
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
  authOptionalMiddleware,
};
