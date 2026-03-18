import React, { useState } from 'react'
import { askAI } from "../services/chat";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const send = async () => {
    const res = await askAI(input);

    setMessages([
      ...messages,
      {role: "user", text: input},
      {role: "ai", text: res.data.answer},
    ]);
    setInput("");
  }

  return (
    <div className='bg-white p-4 rounded shadow h-full flex flex-col'>
      <div className="flex-1 overflow-y-auto">
        {messages.map((m,i) => (
          <div key={i}>{m.text}</div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
         className='flex-1 border p-2' 
        />
        <button onClick={send} className='bg-black text-white px-4'>
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatWindow
