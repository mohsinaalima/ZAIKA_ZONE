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

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

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
    const foodItems = await foodModel.find({})
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

    const isAlreadyLiked = await likeModel.findOne({ user: user._id, food: foodId });

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

    const isAlreadySaved = await saveModel.findOne({ user: user._id, food: foodId });

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
    const savedFoods = await saveModel.find({ user: user._id }).populate("food");

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
