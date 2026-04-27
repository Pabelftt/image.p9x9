// models/Image.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filename: String,
  url: String,
  hash: String
}, { timestamps: true });

module.exports = mongoose.model("Image", imageSchema);