const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is required"], // ✅ added validation
    },
    video: {
      type: String,
      required: [true, "Food video URL is required"], // ✅ added validation
    },
    description: {
      type: String,
      trim: true,
    },
    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodpartner",
      required: true, // ✅ required added
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    savesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // ✅ added timestamps
  }
);

module.exports = mongoose.model("food", foodSchema);
