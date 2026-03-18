import { useState } from "react";
import ChatWindow from "../components/ChatWindow";

export default function Dashboard() {
  const [chatId, setChatId] = useState(
    localStorage.getItem("chatId")
  );

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <ChatWindow chatId={chatId} setChatId={setChatId} />
      </div>
    </div>
  );
}