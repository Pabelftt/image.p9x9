// utils/fileHelper.js
const crypto = require("crypto");

exports.cleanFileName = (name) => {
  return name
    .replace(/[^\w\s.-]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
};

exports.generateHash = (buffer) => {
  return crypto.createHash("md5").update(buffer).digest("hex");
};