const Product = require("../models/Product");

const getAdminDashboard = async (req, res, next) => {
  try {
    const [totalProducts, inStockProducts, outOfStockProducts] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ stockQuantity: { $gt: 0 } }),
      Product.countDocuments({ stockQuantity: { $lte: 0 } })
    ]);

    return res.status(200).json({
      success: true,
      message: "Admin dashboard stats fetched",
      data: {
        totalProducts,
        inStockProducts,
        outOfStockProducts,
        navigation: ["Add Product", "View Products"]
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAdminDashboard };
