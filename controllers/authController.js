// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.showRegister = (req,res)=> res.render("register");
exports.showLogin = (req,res)=> res.render("login");

exports.register = async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({ email: req.body.email, password: hash });
  res.redirect("/login");
};

exports.login = async (req,res)=>{
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("User not found");

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.send("Wrong password");

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "365d" } // 🔥 token expiry
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 🔥 1 year
  });

  res.redirect("/dashboard");
};

exports.logout = (req,res)=>{
  res.clearCookie("token");
  res.redirect("/login");
};