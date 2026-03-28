const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/token");

const signupUser = async (req, res, next) => {
  try {
    const { fullName, name, email, username, password, confirmPassword, type, role } = req.body;
    const resolvedName = fullName || name;

    const resolvedRole = String(type || role || "user").toLowerCase();

    if (!["admin", "user"].includes(resolvedRole)) {
      return res.status(400).json({ success: false, message: "Type/role must be admin or user" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Password and Confirm Password must match" });
    }

    const uniqueChecks = [{ username }];
    if (email) {
      uniqueChecks.push({ email: email.toLowerCase() });
    }

    const existingUser = await User.findOne({ $or: uniqueChecks });

    if (existingUser) {
      return res.status(409).json({ success: false, message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: resolvedName,
      email: email ? email.toLowerCase() : undefined,
      username,
      password: hashedPassword,
      role: resolvedRole
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please login.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifier }]
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role
        },
        redirectTo: String(user.role).toLowerCase() === "admin" ? "/admin/dashboard" : "/home"
      }
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful. Please remove token from client storage."
  });
};

module.exports = {
  signupUser,
  login,
  logout
};
