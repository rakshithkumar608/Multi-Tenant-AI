import { useEffect, useState } from "react";
import { askAI, getChatById } from "../services/chat";

export default function ChatWindow({ chatId, setChatId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (chatId) {
      loadChat(chatId);
    } else {
      setMessages([]);
    }
  }, [chatId]);

  const loadChat = async (id) => {
    const res = await getChatById(id);
    setMessages(res.messages);
  };

  const send = async () => {
    if (!input.trim()) return;

    const res = await askAI(input, chatId);

    localStorage.setItem("chatId", res.chatId);
    setChatId(res.chatId);

    setMessages([
      ...messages,
      { role: "user", content: input },
      { role: "ai", content: res.answer },
    ]);

    setInput("");
  };

  return (
    <div className="bg-white h-full flex flex-col p-4 rounded shadow">

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "text-right" : "text-left"}
          >
            <span className="bg-gray-200 px-3 py-2 rounded inline-block">
              {m.content}
            </span>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="flex mt-4 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={send}
          className="bg-black text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}