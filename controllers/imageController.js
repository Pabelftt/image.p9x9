// controllers/imageController.js
const Image = require("../models/Image");
const fs = require("fs");
const axios = require("axios");
const { generateHash } = require("../utils/fileHelper");

exports.dashboard = async (req,res)=>{
  const total = await Image.countDocuments({ user: req.user.id });
  res.render("dashboard", { total });
};

exports.uploadPage = (req,res)=> res.render("upload");

exports.uploadImage = async (req,res)=>{
  const buffer = fs.readFileSync(req.file.path);
  const hash = generateHash(buffer);

  const exists = await Image.findOne({ hash });
  if (exists) {
    fs.unlinkSync(req.file.path);
    return res.send("Duplicate image!");
  }

  const url = process.env.BASE_URL + "/uploads/" + req.file.filename;

  await Image.create({
    user: req.user.id,
    filename: req.file.filename,
    url,
    hash
  });

  res.send(url);
};

exports.uploadFromUrl = async (req,res)=>{
  const response = await axios({
    url: req.body.imageUrl,
    responseType: "arraybuffer"
  });

  const buffer = Buffer.from(response.data);
  const hash = generateHash(buffer);

  const exists = await Image.findOne({ hash });
  if (exists) return res.send("Duplicate!");

  const filename = Date.now() + ".jpg";
  const filepath = "public/uploads/" + filename;

  fs.writeFileSync(filepath, buffer);

  const url = process.env.BASE_URL + "/uploads/" + filename;

  await Image.create({
    user: req.user.id,
    filename,
    url,
    hash
  });

  res.send(url);
};

exports.listImages = async (req,res)=>{
  const images = await Image.find({ user: req.user.id });
  res.render("list", { images });
};

exports.apiUpload = async (req,res)=>{
  if (!req.file) return res.status(400).json({ error: "No file" });

  const url = process.env.BASE_URL + "/uploads/" + req.file.filename;

  res.json({ success: true, url });
};