// routes/imageRoutes.js
const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../multer");
const ctrl = require("../controllers/imageController");

router.get("/dashboard", auth, ctrl.dashboard);

router.get("/user/image-host", auth, ctrl.uploadPage);
router.post("/upload", auth, upload.single("image"), ctrl.uploadImage);
router.post("/upload-url", auth, ctrl.uploadFromUrl);

router.get("/user/list", auth, ctrl.listImages);
router.delete("/image/delete/:id", auth, ctrl.deleteImage);
router.post("/api/image/host", upload.single("image"), ctrl.apiUpload);

module.exports = router;