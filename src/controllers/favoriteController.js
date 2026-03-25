const Favorite = require("../models/Favorite");
const Product = require("../models/Product");
const { isValidObjectId } = require("../utils/isValidObjectId");

const listFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).populate("product").sort({ createdAt: -1 });

    const products = favorites.map((fav) => fav.product).filter(Boolean);

    return res.status(200).json({
      success: true,
      message: products.length ? "Favorites fetched successfully" : "No favorite products found",
      data: products,
      meta: { total: products.length }
    });
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { productId } = req.body;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const favorite = await Favorite.findOneAndUpdate(
      { user: req.user._id, product: productId },
      { user: req.user._id, product: productId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).populate("product");

    return res.status(200).json({
      success: true,
      message: "Product added to favorites",
      data: favorite.product
    });
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    await Favorite.findOneAndDelete({ user: req.user._id, product: productId });

    return res.status(200).json({
      success: true,
      message: "Product removed from favorites"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listFavorites,
  addFavorite,
  removeFavorite
};
