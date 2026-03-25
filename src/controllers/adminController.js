const Product = require("../models/Product");

const getAdminDashboard = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Admin dashboard stats fetched",
      data: {
        totalProducts,
        navigation: ["Add Product", "View Products"]
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAdminDashboard };
