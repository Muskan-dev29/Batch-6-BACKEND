const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    imageUrl: {
      type: String,
      trim: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
