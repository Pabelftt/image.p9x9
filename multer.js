// multer.js
const multer = require("multer");
const { cleanFileName } = require("./utils/fileHelper");

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    const name = cleanFileName(file.originalname);
    cb(null, Date.now() + "-" + name);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/png", "image/jpeg", "image/gif", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files allowed"));
};

module.exports = multer({ storage, fileFilter });