const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    default: new mongoose.Types.ObjectId("69eeed93ddc14e1825c65a2a")
  },
  filename: String,
  url: String,
  hash: String
}, { timestamps: true });

module.exports = mongoose.model("Image", imageSchema);