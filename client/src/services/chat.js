import api from "./api"

export const askAI = (question) => 
    api.post("/chat/ask", { question });

export const getHistory = () => 
    api.get("/chat/history");
