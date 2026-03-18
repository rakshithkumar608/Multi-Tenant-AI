const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    userId: String,
    tenantId: String,

    chatId: String,
    title: String,

    messages: [
      {
        role: String,
        content: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);