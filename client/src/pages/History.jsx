import { useEffect, useState } from "react";
import { getHistory } from "../services/chat";
import { toast } from "react-hot-toast";
import { Circle, Square, Triangle } from "lucide-react";

export default function History() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const msgs = await getHistory();
      setMessages(msgs);
      toast.success("History loaded 📜");
    } catch (err) {
      toast.error("Failed to load history ❌", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-['Outfit'] p-6 max-w-4xl mx-auto">
      
      {/* HEADER */}
      <div className="space-y-3 pb-6 border-b-4 border-[#121212]">
        <div className="flex gap-1.5 mb-2">
          <Circle className="w-4 h-4 fill-[#D02020] text-[#D02020]" strokeWidth={0} />
          <Square className="w-4 h-4 fill-[#1040C0] text-[#1040C0]" strokeWidth={0} />
          <Triangle className="w-4 h-4 fill-[#F0C020] text-[#F0C020]" strokeWidth={0} />
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tighter text-[#121212]">
          Chat History
        </h2>
        <div className="w-24 h-1 bg-[#F0C020]" />
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <div className="flex items-center justify-center p-12 bg-white border-4 border-[#121212] shadow-[6px_6px_0px_0px_rgba(18,18,18,1)]">
          <div className="text-center space-y-4">
            {/* Animated geometric loader */}
            <div className="flex gap-2 justify-center items-end">
              <div className="w-3 h-3 bg-[#D02020] animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-3 h-3 bg-[#1040C0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-3 h-3 bg-[#F0C020] animate-bounce" style={{ animationDelay: '300ms', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#121212]">
              Loading...
            </p>
          </div>
        </div>
      ) : messages.length === 0 ? (
        /* EMPTY STATE */
        <div className="bg-[#F0F0F0] border-4 border-[#121212] shadow-[6px_6px_0px_0px_rgba(18,18,18,1)] p-12 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-[#D02020] opacity-10 rotate-45" />
          <div className="absolute bottom-4 left-4 w-20 h-20 bg-[#1040C0] opacity-10 rounded-full" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex gap-2 justify-center items-center mb-4">
              <Square className="w-8 h-8 fill-[#E0E0E0] text-[#E0E0E0] rotate-45" strokeWidth={0} />
              <Circle className="w-6 h-6 fill-[#E0E0E0] text-[#E0E0E0]" strokeWidth={0} />
            </div>
            <p className="text-lg font-bold uppercase tracking-wide text-[#121212]/60">
              No history yet
            </p>
            <p className="text-sm font-medium text-[#121212]/40">
              Start a conversation to see your chat history
            </p>
          </div>
        </div>
      ) : (
        /* MESSAGE LIST */
        <div className="space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-4 border-2 border-[#121212] relative transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] hover:-translate-y-0.5 ${
                m.role === "user"
                  ? "bg-[#1040C0] text-white ml-12"
                  : "bg-white text-[#121212] mr-12"
              }`}
            >
              {/* Role indicator - geometric shape */}
              <div className={`absolute top-3 ${m.role === "user" ? "right-3" : "left-3"}`}>
                {m.role === "user" ? (
                  <Circle className="w-3 h-3 fill-[#F0C020] text-[#F0C020]" strokeWidth={0} />
                ) : (
                  <Square className="w-3 h-3 fill-[#D02020] text-[#D02020]" strokeWidth={0} />
                )}
              </div>

              {/* Role label */}
              <div className={`text-[9px] font-bold uppercase tracking-widest mb-2 ${
                m.role === "user" ? "text-white/70 text-right" : "text-[#121212]/60"
              }`}>
                {m.role === "user" ? "You" : "AI"}
              </div>

              {/* Message content */}
              <div className={`font-medium leading-relaxed ${
                m.role === "user" ? "text-right" : "text-left"
              }`}>
                {m.content}
              </div>

              {/* Bottom corner decoration */}
              <div className={`absolute bottom-2 w-2 h-2 ${
                m.role === "user" 
                  ? "left-2 bg-white/20" 
                  : "right-2 bg-[#F0C020]"
              }`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}