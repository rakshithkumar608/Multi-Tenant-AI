import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";

/* 🔥 STREAM WITH ABORT SUPPORT */
const streamAI = async (question, chatId, onChunk, signal) => {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/chat/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ question, chatId }),
    signal,
  });

  if (!res.ok) throw new Error("Streaming failed");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;

    if (value) {
      onChunk(decoder.decode(value));
    }
  }
};

const ChatWindow = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const bottomRef = useRef();
  const controllerRef = useRef(null);

  /* ✅ AUTO SCROLL */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* 🔥 LOAD CHAT */
  useEffect(() => {
    const loadChat = async () => {
      if (!chatId) {
        setMessages([]);
        return;
      }

      try {
        const token = localStorage.getItem("token");

        setMessages([]);

        const res = await fetch(`/api/chat/${chatId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Load chat error:", err);
      }
    };

    loadChat();
  }, [chatId]);

  /* 🔥 CLEAN JSON PARSER */
  const extractAnswer = (text) => {
    try {
      const parsed = JSON.parse(text);
      return parsed.answer || text;
    } catch {
      return text;
    }
  };

  /* ✅ SEND MESSAGE */
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };

    let newMessages =
      editIndex !== null
        ? messages.slice(0, editIndex)
        : [...messages];

    newMessages.push(userMessage);
    newMessages.push({ role: "assistant", content: "" });

    setMessages(newMessages);

    const currentInput = input;
    setInput("");
    setLoading(true);
    setEditIndex(null);

    let rawBuffer = "";
    let aiMessage = "";

    controllerRef.current = new AbortController();

    try {
      await streamAI(
        currentInput,
        chatId,
        (chunk) => {
          rawBuffer += chunk;

          const cleaned = extractAnswer(rawBuffer);
          aiMessage = cleaned;

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: aiMessage,
            };
            return updated;
          });
        },
        controllerRef.current.signal
      );
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Streaming error:", err);

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: "⚠️ Error generating response",
          };
          return updated;
        });
      }
    }

    setLoading(false);
  };

  /* ✏️ EDIT MESSAGE */
  const handleEdit = (index, text) => {
    setInput(text);
    setEditIndex(index);
  };

  /* 🔁 REGENERATE */
  const handleRegenerate = () => {
    const lastUser = [...messages].reverse().find(m => m.role === "user");
    if (lastUser) {
      setInput(lastUser.content);
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* 🧠 Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Start a conversation 🚀
          </div>
        ) : (
          messages.map((msg, i) => (
            <MessageBubble
              key={i}
              role={msg.role}
              content={msg.content}
              index={i}
              onEdit={handleEdit}
            />
          ))
        )}

        {loading && (
          <div className="text-gray-400 text-sm animate-pulse">
            AI is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* 🔁 Regenerate */}
      {!loading && messages.length > 0 && (
        <div className="px-6 pb-2">
          <button
            onClick={handleRegenerate}
            className="text-sm text-blue-500"
          >
            🔄 Regenerate
          </button>
        </div>
      )}

      {/* ✍️ Input */}
      <div className="border-t p-4 bg-white flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 border rounded-lg px-4 py-2 outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {loading ? (
          <button
            onClick={() => controllerRef.current?.abort()}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;