const express = require("express");
const { getAdminDashboard } = require("../controllers/adminController");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/dashboard", protect, authorizeRoles("admin"), getAdminDashboard);

module.exports = router;
