const aiService = require("../services/ai.service");
const Chat = require("../models/chat.model");
const { v4: uuidv4 } = require("uuid");

exports.askQuestion = async (req, res) => {
  try {
    const { question, chatId } = req.body;
    const { userId, tenantId } = req.user;

    let currentChatId = chatId;

    if (!currentChatId) {
      currentChatId = uuidv4();
    }

    const answer = await aiService.askAI(question, tenantId);

    await Chat.findOneAndUpdate(
      { userId, tenantId, chatId: currentChatId },
      {
        $setOnInsert: {
          chatId: currentChatId,
          title: question.substring(0, 25),
        },
        $push: {
          messages: [
            { role: "user", content: question },
            { role: "ai", content: answer },
          ],
        },
      },
      { upsert: true }
    );

    res.json({
      answer,
      chatId: currentChatId,
    });

  } catch (error) {
    console.error("ASK ERROR:", error);

    res.status(500).json({
      message: "Error processing request",
    });
  }
};