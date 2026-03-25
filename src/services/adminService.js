const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createDefaultAdminIfNeeded = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Admin";

  if (!email || !password) {
    return;
  }

  const existingAdmin = await User.findOne({ email: email.toLowerCase() });
  if (existingAdmin) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email: email.toLowerCase(),
    username: "admin",
    password: hashedPassword,
    role: "admin"
  });

  console.log("Default admin created");
};

module.exports = { createDefaultAdminIfNeeded };
