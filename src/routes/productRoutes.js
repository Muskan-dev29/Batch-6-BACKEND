const express = require("express");
const { body } = require("express-validator");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const { validateRequest } = require("../middlewares/validationMiddleware");

const router = express.Router();

const productValidationRules = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("category").notEmpty().withMessage("Category is required"),
  body("stockQuantity").isInt({ min: 0 }).withMessage("Stock quantity must be 0 or greater"),
  body("description").notEmpty().withMessage("Description is required"),
  body("imageUrl").optional().isURL().withMessage("Image URL must be valid"),
  body("brand").notEmpty().withMessage("Brand is required"),
  body("discount").optional().isFloat({ min: 0, max: 100 }).withMessage("Discount must be 0 to 100")
];

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/", protect, authorizeRoles("admin"), productValidationRules, validateRequest, createProduct);
router.put("/:id", protect, authorizeRoles("admin"), productValidationRules, validateRequest, updateProduct);
router.delete("/:id", protect, authorizeRoles("admin"), deleteProduct);

module.exports = router;
