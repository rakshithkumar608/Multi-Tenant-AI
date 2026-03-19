import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { Circle, Square, Triangle, Send, StopCircle, RefreshCw } from "lucide-react";

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


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


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

 
  const extractAnswer = (text) => {
    try {
      const parsed = JSON.parse(text);
      return parsed.answer || text;
    } catch {
      return text;
    }
  };

  
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

 
  const handleEdit = (index, text) => {
    setInput(text);
    setEditIndex(index);
  };


  const handleRegenerate = () => {
    const lastUser = [...messages].reverse().find(m => m.role === "user");
    if (lastUser) {
      setInput(lastUser.content);
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F0F0F0] relative font-['Outfit']">
      
    
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        {messages.length === 0 ? (
          
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-6 max-w-md">
              
              <div className="flex justify-center gap-3">
                <div className="w-12 h-12 bg-[#D02020] border-2 border-[#121212] rotate-45 animate-pulse" />
                <Circle className="w-12 h-12 fill-[#1040C0] text-[#1040C0] animate-pulse" strokeWidth={0} style={{ animationDelay: '150ms' }} />
                <div className="w-12 h-12 bg-[#F0C020] border-2 border-[#121212] animate-pulse" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '300ms' }} />
              </div>
              
              <div className="space-y-2">
                <p className="text-xl font-black uppercase tracking-tight text-[#121212]">
                  Start a Conversation
                </p>
                <p className="text-sm font-medium text-[#121212]/60">
                  Ask me anything to begin
                </p>
              </div>
            </div>
          </div>
        ) : (
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((msg, i) => (
              <MessageBubble
                key={i}
                role={msg.role}
                content={msg.content}
                index={i}
                onEdit={handleEdit}
              />
            ))}

           
            {loading && (
              <div className="flex items-center gap-3 p-4 bg-white border-2 border-[#121212] shadow-[3px_3px_0px_0px_rgba(18,18,18,1)] max-w-xs">
                <Square className="w-4 h-4 fill-[#D02020] text-[#D02020]" strokeWidth={0} />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#121212] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#121212] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#121212] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#121212]/60">
                  AI is typing
                </span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>


      {!loading && messages.length > 0 && (
        <div className="px-4 sm:px-6 pb-3 max-w-4xl mx-auto w-full">
          <button
            onClick={handleRegenerate}
            className="flex items-center gap-2 bg-white text-[#121212] px-4 py-2 border-2 border-[#121212] font-bold uppercase text-xs tracking-widest shadow-[3px_3px_0px_0px_rgba(18,18,18,1)] hover:bg-[#F0C020] hover:shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200"
          >
            <RefreshCw className="w-3 h-3" strokeWidth={3} />
            Regenerate
          </button>
        </div>
      )}

     
      <div className="border-t-4 border-[#121212] p-4 bg-white">
        <div className="flex gap-2 sm:gap-3 max-w-4xl mx-auto">
          
        
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="w-full border-2 border-[#121212] px-4 py-3 bg-[#F0F0F0] focus:outline-none focus:ring-2 focus:ring-[#1040C0] focus:ring-offset-2 font-medium text-sm transition-all placeholder:text-[#121212]/40"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
          
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#F0C020] rounded-full" />
          </div>

         
          {loading ? (
           
            <button
              onClick={() => controllerRef.current?.abort()}
              className="bg-[#D02020] text-white px-4 sm:px-6 py-3 border-4 border-[#121212] font-black uppercase text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] hover:bg-[#D02020]/90 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200 flex items-center gap-2"
            >
              <StopCircle className="w-4 h-4" strokeWidth={3} />
              <span className="hidden sm:inline">Stop</span>
            </button>
          ) : (
         
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`px-4 sm:px-6 py-3 border-4 border-[#121212] font-black uppercase text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] transition-all duration-200 flex items-center gap-2 ${
                input.trim()
                  ? 'bg-[#1040C0] text-white hover:bg-[#1040C0]/90 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer'
                  : 'bg-[#E0E0E0] text-[#121212]/40 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" strokeWidth={3} />
              <span className="hidden sm:inline">Send</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;