import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  const [chatId, setChatId] = useState(
    localStorage.getItem("chatId")
  );

  return (
    <div className="flex h-screen">
      {/* ✅ Sidebar always visible */}
      <Sidebar chatId={chatId} setChatId={setChatId} />

      {/* ✅ Pass state to pages via Outlet */}
      <div className="flex-1">
        <Outlet context={{ chatId, setChatId }} />
      </div>
    </div>
  );
}