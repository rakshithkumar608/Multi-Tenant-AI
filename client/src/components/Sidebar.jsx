import { useEffect, useState } from "react";
import { getChats, deleteChat } from "../services/chat";
import { Link } from "react-router-dom";
import { Trash2, Circle, Square, Triangle } from "lucide-react";

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
    <div className="w-64 bg-[#F0F0F0] border-r-4 border-black p-6 flex flex-col font-['Outfit']">
      {/* GEOMETRIC LOGO */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Circle className="w-4 h-4 fill-[#D02020] text-[#D02020]" strokeWidth={0} />
          <Square className="w-4 h-4 fill-[#1040C0] text-[#1040C0]" strokeWidth={0} />
          <Triangle className="w-4 h-4 fill-[#F0C020] text-[#F0C020]" strokeWidth={0} />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tighter text-[#121212]">
          AI SaaS
        </h1>
      </div>

      {/* NEW CHAT BUTTON */}
      <button
        onClick={handleNewChat}
        className="bg-[#D02020] text-white font-bold uppercase tracking-wider text-sm p-3 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_black] hover:bg-[#D02020]/90 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200 mb-6"
      >
        + New Chat
      </button>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-6">
        {chats.map((chat) => (
          <div
            key={chat.chatId}
            className={`flex justify-between items-center p-3 border-2 border-black transition-all duration-200 ${
              chatId === chat.chatId
                ? "bg-[#1040C0] text-white shadow-[4px_4px_0px_0px_black]"
                : "bg-white hover:shadow-[3px_3px_0px_0px_black] hover:-translate-y-0.5"
            }`}
          >
            <div
              onClick={() => handleSelect(chat.chatId)}
              className="cursor-pointer flex-1 truncate font-medium text-sm"
            >
              {chat.title || "Untitled"}
            </div>

            <button
              onClick={() => handleDelete(chat.chatId)}
              className={`ml-2 p-1 rounded-full transition-colors duration-200 ${
                chatId === chat.chatId
                  ? "hover:bg-white/20"
                  : "hover:bg-[#D02020]/10"
              }`}
            >
              <Trash2 
                className={`w-4 h-4 ${
                  chatId === chat.chatId ? "text-white" : "text-[#D02020]"
                }`}
                strokeWidth={2}
              />
            </button>
          </div>
        ))}
      </div>

      {/* NAVIGATION */}
      <div className="border-t-4 border-black pt-6 space-y-3">
        <Link 
          to="/dashboard"
          className="flex items-center gap-3 p-3 bg-white border-2 border-black font-bold uppercase text-xs tracking-widest text-[#121212] hover:bg-[#F0C020] hover:shadow-[3px_3px_0px_0px_black] transition-all duration-200"
        >
          <Circle className="w-3 h-3 fill-[#D02020] text-[#D02020]" strokeWidth={0} />
          Chat
        </Link>
        <Link 
          to="/upload"
          className="flex items-center gap-3 p-3 bg-white border-2 border-black font-bold uppercase text-xs tracking-widest text-[#121212] hover:bg-[#F0C020] hover:shadow-[3px_3px_0px_0px_black] transition-all duration-200"
        >
          <Square className="w-3 h-3 fill-[#1040C0] text-[#1040C0]" strokeWidth={0} />
          Upload
        </Link>
        <Link 
          to="/history"
          className="flex items-center gap-3 p-3 bg-white border-2 border-black font-bold uppercase text-xs tracking-widest text-[#121212] hover:bg-[#F0C020] hover:shadow-[3px_3px_0px_0px_black] transition-all duration-200"
        >
          <Triangle className="w-3 h-3 fill-[#F0C020] text-[#F0C020]" strokeWidth={0} />
          History
        </Link>
      </div>
    </div>
  );
}