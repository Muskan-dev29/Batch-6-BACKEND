require("dotenv").config();
const os = require("os");

const app = require("./app");
const connectDB = require("./config/db");
const { createDefaultAdminIfNeeded } = require("./services/adminService");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

const getLocalIpv4Addresses = () => {
  const interfaces = os.networkInterfaces();
  const ips = [];

  Object.values(interfaces).forEach((addresses) => {
    (addresses || []).forEach((addressInfo) => {
      if (addressInfo.family === "IPv4" && !addressInfo.internal) {
        ips.push(addressInfo.address);
      }
    });
  });

  return ips;
};

const startServer = async () => {
  try {
    await connectDB();
    await createDefaultAdminIfNeeded();

    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://localhost:${PORT}`);

      if (HOST === "0.0.0.0") {
        const localIps = getLocalIpv4Addresses();
        localIps.forEach((ip) => {
          console.log(`LAN URL: http://${ip}:${PORT}`);
        });
      }
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
