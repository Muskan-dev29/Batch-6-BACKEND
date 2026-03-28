const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const requiredRoles = roles.map((role) => String(role).toLowerCase());
    const userRole = req.user?.role ? String(req.user.role).toLowerCase() : null;

    if (!req.user || !userRole || !requiredRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: insufficient permissions",
        details: {
          requiredRoles,
          userRole: req.user?.role || null
        }
      });
    }
    next();
  };
};

module.exports = { authorizeRoles };
