// app.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");

const app = express();

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB Connected"))
  .catch(err=>console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(helmet());
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));

// Routes
app.use("/", authRoutes);
app.use("/", imageRoutes);

// Server
app.listen(process.env.PORT, ()=>{
  console.log("Server running on port " + process.env.PORT);
});