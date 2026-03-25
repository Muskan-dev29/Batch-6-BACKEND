const express = require("express");
const { body } = require("express-validator");
const {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeCartItem
} = require("../controllers/cartController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const { validateRequest } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.use(protect, authorizeRoles("user"));

router.get("/", getCart);

router.post(
  "/",
  [
    body("productId").notEmpty().withMessage("productId is required"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1")
  ],
  validateRequest,
  addToCart
);

router.patch(
  "/:productId",
  [
    body("action")
      .optional()
      .isIn(["increment", "decrement"])
      .withMessage("Action must be increment or decrement"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1")
  ],
  validateRequest,
  updateCartItemQuantity
);

router.delete("/:productId", removeCartItem);

module.exports = router;
