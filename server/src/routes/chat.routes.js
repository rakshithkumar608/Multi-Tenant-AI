const express = require("express");
const { askQuestion } = require("../controllers/chat.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();



router.post("/ask", askQuestion);
router.get("/test", (req, res) => {
  res.send("Chat route working");
});

module.exports = router;