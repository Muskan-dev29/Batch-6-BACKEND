const express = require("express");
const { body } = require("express-validator");
const { signupUser, login, logout } = require("../controllers/authController");
const { validateRequest } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post(
  "/signup",
  [
    body().custom((_, { req }) => {
      if (!req.body.fullName && !req.body.name) {
        throw new Error("Full name is required");
      }
      return true;
    }),
    body("username").notEmpty().withMessage("Username is required"),
    body("email").optional().isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("confirmPassword").notEmpty().withMessage("Confirm Password is required"),
    body("type")
      .optional()
      .custom((value) => ["admin", "user"].includes(String(value).toLowerCase()))
      .withMessage("Type must be admin or user"),
    body("role")
      .optional()
      .custom((value) => ["admin", "user"].includes(String(value).toLowerCase()))
      .withMessage("Role must be admin or user")
  ],
  validateRequest,
  signupUser
);

router.post(
  "/login",
  [
    body("identifier").notEmpty().withMessage("Email or username is required"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  validateRequest,
  login
);

router.post("/logout", logout);

module.exports = router;
