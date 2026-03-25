const express = require("express");
const { body } = require("express-validator");
const { listFavorites, addFavorite, removeFavorite } = require("../controllers/favoriteController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const { validateRequest } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.use(protect, authorizeRoles("user"));

router.get("/", listFavorites);
router.post(
  "/",
  [body("productId").notEmpty().withMessage("productId is required")],
  validateRequest,
  addFavorite
);
router.delete("/:productId", removeFavorite);

module.exports = router;
