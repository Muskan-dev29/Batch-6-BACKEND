const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
      hint: "Send required fields as form-data keys: name, price, category, stockQuantity, description, brand (and image as file field named image). Avoid manually setting Content-Type in Postman.",
      debug: {
        contentType: req.headers["content-type"] || null,
        receivedBodyKeys: Object.keys(req.body || {}),
        hasFile: Boolean(req.file)
      }
    });
  }
  next();
};

module.exports = { validateRequest };
