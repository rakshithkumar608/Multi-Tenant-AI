const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();

const { upload: uploadFile } = require("../controllers/upload.controller");
const auth = require("../middlewares/auth.middleware")


router.post("/", auth,upload.single("file"), uploadFile);

module.exports = router;