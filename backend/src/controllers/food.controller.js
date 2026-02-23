const foodModel = require("../models/food.model");
const likeModel = require("../models/like.model");
const saveModel = require("../models/save.model");
const commentModel = require("../models/comment.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // 📤 Upload to ImageKit
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

    res
      .status(201)
      .json({ message: "Food created successfully", food: foodItem });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
}

async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel
      .find({})
      .populate("foodPartner", "name email");

    const foodItemsWithStatus = await Promise.all(
      foodItems.map(async (item) => {
        let isLiked = false;
        let isSaved = false;

        // ✅ Defensive check for guests (prevents 500 error)
        const viewerId = req.user?._id || req.foodPartner?._id;

        if (viewerId) {
          const [like, save] = await Promise.all([
            likeModel.findOne({ user: viewerId, food: item._id }),
            saveModel.findOne({ user: viewerId, food: item._id }),
          ]);
          isLiked = !!like;
          isSaved = !!save;
        }

        return { ...item.toObject(), isLiked, isSaved };
      }),
    );

    res.status(200).json({ foodItems: foodItemsWithStatus });
  } catch (error) {
    console.error("FEED ERROR:", error);
    res.status(500).json({ message: "Could not fetch feed" });
  }
}

async function likeFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user || req.foodPartner; // ✅ Allow partners to like too

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

async function saveFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user || req.foodPartner;

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

async function getSaveFood(req, res) {
  try {
    const user = req.user || req.foodPartner;
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

async function addComment(req, res) {
  try {
    const { foodId, text } = req.body;
    const user = req.user || req.foodPartner;

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
