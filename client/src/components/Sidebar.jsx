import { useEffect, useState } from "react";
import { getChats, deleteChat } from "../services/chat";
import { Link } from "react-router-dom";

export default function Sidebar({ chatId, setChatId }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    const data = await getChats();
    setChats(data || []);
  };

  const handleNewChat = () => {
    localStorage.removeItem("chatId");
    setChatId(null);
  };

  const handleSelect = (id) => {
    localStorage.setItem("chatId", id);
    setChatId(id);
  };

  const handleDelete = async (id) => {
    await deleteChat(id);

    const updated = chats.filter((c) => c.chatId !== id);
    setChats(updated);

    if (chatId === id) {
      localStorage.removeItem("chatId");
      setChatId(null);
    }
  };

  return (
    <div className="w-64 bg-black text-white p-4 flex flex-col">

      <h1 className="text-lg font-bold mb-4">AI SaaS</h1>

      {/* NEW CHAT */}
      <button
        onClick={handleNewChat}
        className="bg-white text-black p-2 rounded mb-4"
      >
        + New Chat
      </button>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.chatId}
            className={`flex justify-between items-center p-2 rounded ${
              chatId === chat.chatId
                ? "bg-white text-black"
                : "hover:bg-gray-700"
            }`}
          >
            <div
              onClick={() => handleSelect(chat.chatId)}
              className="cursor-pointer flex-1"
            >
              {chat.title}
            </div>

            <button
              onClick={() => handleDelete(chat.chatId)}
              className="text-red-400 ml-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* NAV */}
      <div className="border-t mt-4 pt-4 space-y-2">
        <Link to="/dashboard">💬 Chat</Link>
        <Link to="/upload">📄 Upload</Link>
        <Link to="/history">🕘 History</Link>
      </div>
    </div>
  );
}