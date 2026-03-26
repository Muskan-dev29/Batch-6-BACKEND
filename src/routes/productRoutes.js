const express = require("express");
const { body } = require("express-validator");

const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const { validateRequest } = require("../middlewares/validationMiddleware");
const { uploadProductImage } = require("../middlewares/uploadMiddleware");

const router = express.Router();

const normalizeProductPayload = (req, res, next) => {
  req.body = req.body || {};

  const aliases = {
    name: ["productName", "product_name", "Product Name"],
    price: ["productPrice", "product_price", "Price"],
    category: ["productCategory", "product_category", "Category"],
    stockQuantity: ["stock", "stockQty", "stock_quantity", "Stock Quantity"],
    description: ["productDescription", "product_description", "Description"],
    brand: ["productBrand", "product_brand", "Brand"],
    discount: ["productDiscount", "product_discount", "Discount"],
    imageUrl: ["imageURL", "image_url", "Image URL"]
  };

  Object.entries(aliases).forEach(([targetKey, sourceKeys]) => {
    if (req.body[targetKey] !== undefined) {
      return;
    }

    const matchedKey = sourceKeys.find((key) => req.body[key] !== undefined);
    if (matchedKey) {
      req.body[targetKey] = req.body[matchedKey];
    }
  });

  next();
};

const createProductValidationRules = [
  body("name").notEmpty().trim().withMessage("Product name is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("category").notEmpty().trim().withMessage("Category is required"),
  body("stockQuantity").isInt({ min: 0 }).withMessage("Stock quantity must be 0 or greater"),
  body("description").notEmpty().trim().withMessage("Description is required"),
  body("imageUrl").optional().trim().isURL().withMessage("Image URL must be valid"),
  body("brand").notEmpty().trim().withMessage("Brand is required"),
  body("discount").optional().isFloat({ min: 0, max: 100 }).withMessage("Discount must be 0 to 100")
];

const updateProductValidationRules = [
  body("name").optional().notEmpty().trim().withMessage("Product name cannot be empty"),
  body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("category").optional().notEmpty().trim().withMessage("Category cannot be empty"),
  body("stockQuantity").optional().isInt({ min: 0 }).withMessage("Stock quantity must be 0 or greater"),
  body("description").optional().notEmpty().trim().withMessage("Description cannot be empty"),
  body("imageUrl").optional().trim().isURL().withMessage("Image URL must be valid"),
  body("brand").optional().notEmpty().trim().withMessage("Brand cannot be empty"),
  body("discount").optional().isFloat({ min: 0, max: 100 }).withMessage("Discount must be 0 to 100")
];

// ===== PUBLIC ENDPOINTS (No Authentication Required) =====
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// ===== ADMIN ENDPOINTS (Authentication & Admin Role Required) =====
router.post("/", protect, authorizeRoles("admin"), uploadProductImage.single("image"), normalizeProductPayload, createProductValidationRules, validateRequest, addProduct);
router.put("/:id", protect, authorizeRoles("admin"), uploadProductImage.single("image"), normalizeProductPayload, updateProductValidationRules, validateRequest, updateProduct);
router.delete("/:id", protect, authorizeRoles("admin"), deleteProduct);

module.exports = router;
