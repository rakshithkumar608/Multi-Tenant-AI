import api from "./api";


// 🚀 ASK AI (supports multi-chat)
export const askAI = async (question, chatId) => {
  try {
    const res = await api.post("/chat/ask", {
      question,
      chatId, // 🔥 IMPORTANT
    });

    return res.data; // { answer, chatId }
  } catch (err) {
    console.error("ASK ERROR:", err);
    throw err;
  }
};


// 🚀 GET ALL CHATS (SIDEBAR)
export const getChats = async () => {
  try {
    const res = await api.get("/chat/list");

    return res.data || [];
  } catch (err) {
    console.error("GET CHATS ERROR:", err);
    throw err;
  }
};


// 🚀 GET SINGLE CHAT BY ID
export const getChatById = async (chatId) => {
  try {
    const res = await api.get(`/chat/${chatId}`);

    return res.data; // { messages: [...] }
  } catch (err) {
    console.error("GET CHAT ERROR:", err);
    throw err;
  }
};


// 🚀 (OPTIONAL) OLD HISTORY — KEEP ONLY IF NEEDED
export const getHistory = async () => {
  try {
    const res = await api.get("/chat/history");

    return res.data?.messages || [];
  } catch (err) {
    console.error("HISTORY ERROR:", err);
    throw err;
  }
};


// 🚀 CLEAR ALL CHATS
export const clearChat = async () => {
  try {
    const res = await api.delete("/chat/clear");

    return res.data;
  } catch (err) {
    console.error("CLEAR ERROR:", err);
    throw err;
  }
};

export const deleteChat = async (chatId) => {
  const res = await api.delete(`/chat/${chatId}`);
  return res.data;
};
