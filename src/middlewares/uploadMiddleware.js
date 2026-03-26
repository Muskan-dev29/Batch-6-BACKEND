const path = require("path");
const fs = require("fs");

let multer;
try {
  multer = require("multer");
} catch (error) {
  multer = null;
}

const uploadDir = path.join(__dirname, "../../uploads/products");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

let uploadProductImage;

if (multer) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, fileName);
    }
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (jpg, jpeg, png, webp) are allowed"), false);
    }
  };

  uploadProductImage = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024
    }
  });
} else {
  uploadProductImage = {
    single: () => (req, res, next) => {
      const contentType = req.headers["content-type"] || "";
      if (contentType.includes("multipart/form-data")) {
        return res.status(500).json({
          success: false,
          message: "Image upload is temporarily unavailable because 'multer' is not installed. Run: npm install multer"
        });
      }

      return next();
    }
  };
}

module.exports = { uploadProductImage };
