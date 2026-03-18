const express = require("express");
const router = express.Router();

const { askQuestion } = require("../controllers/chat.controller");
const auth = require("../middlewares/auth.middleware");
const Chat = require("../models/chat.model");

console.log("✅ CHAT ROUTES FILE LOADED");



router.post("/ask", auth, askQuestion);



router.get("/history", auth, async (req, res) => {
  try {
    const { userId, tenantId } = req.user;

    const chat = await Chat.findOne({ userId, tenantId });

    return res.json({
      messages: chat?.messages || [],
    });
  } catch (err) {
    console.error("HISTORY ERROR:", err);
    res.status(500).json({ message: "Failed to load history" });
  }
});



router.get("/list", auth, async (req, res) => {
  try {
    const { userId, tenantId } = req.user;

    const chats = await Chat.find({ userId, tenantId })
      .select("chatId title createdAt")
      .sort({ createdAt: -1 });

    res.json(chats);
  } catch (err) {
    console.error("LIST ERROR:", err);
    res.status(500).json({ message: "Failed to load chats" });
  }
});



router.get("/:chatId", auth, async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOne({ chatId: req.params.chatId });

    res.json({
      messages: chat?.messages || [],
    });
  } catch (err) {
    console.error("CHAT LOAD ERROR:", err);
    res.status(500).json({ message: "Failed to load chat" });
  }
});



router.delete("/clear", auth, async (req, res) => {
  try {
    const { userId, tenantId } = req.user;

    await Chat.deleteMany({ userId, tenantId });

    res.json({ message: "Chat cleared ✅" });
  } catch (err) {
    console.error("CLEAR ERROR:", err);
    res.status(500).json({ message: "Failed to clear chat" });
  }
});

router.delete("/:chatId", auth, async (req, res) => {
  try {
    await Chat.deleteOne({ chatId: req.params.chatId });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting chat" });
  }
});



router.get("/test", (req, res) => {
  res.send("Chat route working ✅");
});


module.exports = router;