import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Layout() {
  const [chatId, setChatId] = useState(
    localStorage.getItem("chatId")
  );

  return (
    <div className="flex flex-col h-screen">
      
     
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        
        <Sidebar chatId={chatId} setChatId={setChatId} />

        
        <div className="flex-1 overflow-hidden">
          <Outlet context={{ chatId, setChatId }} />
        </div>
      </div>
    </div>
  );
}