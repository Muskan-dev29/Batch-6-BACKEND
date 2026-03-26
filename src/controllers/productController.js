const Product = require("../models/Product");
const { isValidObjectId } = require("../utils/isValidObjectId");

// ===== PUBLIC ENDPOINTS (For Users) =====

const getAllProducts = async (req, res, next) => {
  try {
    const { q, category, page = 1, limit = 10 } = req.query;
    const query = {};

    if (q) {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } }
      ];
    }

    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    return res.status(200).json({
      success: true,
      message: products.length ? "Products fetched successfully" : "No products found",
      data: products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// ===== ADMIN ENDPOINTS (Add, Update, Delete) =====

const addProduct = async (req, res, next) => {
  try {
    const { name, price, category, stockQuantity, description, imageUrl, brand, discount } = req.body;
    const uploadedImageUrl = req.file ? `/uploads/products/${req.file.filename}` : undefined;

    // Validation
    if (!name || !price || !category || stockQuantity === undefined || !description || !brand) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    // Check for duplicate product name
    const existingProduct = await Product.findOne({ name: name.trim() });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with this name already exists"
      });
    }

    const newProduct = new Product({
      name: name.trim(),
      price: Number(price),
      category: category.trim(),
      stockQuantity: Number(stockQuantity),
      description: description.trim(),
      imageUrl: uploadedImageUrl || imageUrl?.trim() || "",
      brand: brand.trim(),
      discount: discount ? Number(discount) : 0
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, category, stockQuantity, description, imageUrl, brand, discount } = req.body;
    const uploadedImageUrl = req.file ? `/uploads/products/${req.file.filename}` : undefined;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Check if another product has the same name (if name is being changed)
    if (name && name !== product.name) {
      const existingProduct = await Product.findOne({ name: name.trim() });
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: "Product with this name already exists"
        });
      }
    }

    // Update fields
    if (name) product.name = name.trim();
    if (price !== undefined) product.price = Number(price);
    if (category) product.category = category.trim();
    if (stockQuantity !== undefined) product.stockQuantity = Number(stockQuantity);
    if (description) product.description = description.trim();
    if (uploadedImageUrl) {
      product.imageUrl = uploadedImageUrl;
    } else if (imageUrl !== undefined) {
      product.imageUrl = imageUrl?.trim() || "";
    }
    if (brand) product.brand = brand.trim();
    if (discount !== undefined) product.discount = Number(discount);

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: { deletedProductId: id }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // Public endpoints
  getAllProducts,
  getProductById,
  // Admin endpoints
  addProduct,
  updateProduct,
  deleteProduct
};
