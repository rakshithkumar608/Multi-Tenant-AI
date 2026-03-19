import { motion } from "framer-motion";
import MarkdownRenderer from "./MarkdownRenderer";
import { User, Bot, Edit2, Copy, Check } from "lucide-react";
import { useState } from "react";

const MessageBubble = ({ role, content, index, onEdit }) => {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-3 sm:gap-4 my-4 font-['Outfit'] ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
    
      {!isUser && (
        <div className="w-10 h-10 bg-[#D02020] border-2 border-[#121212] flex items-center justify-center shrink-0 shadow-[3px_3px_0px_0px_rgba(18,18,18,1)]">
          <Bot className="w-5 h-5 text-white" strokeWidth={3} />
        </div>
      )}

      
      <div
        className={`relative max-w-[85%] sm:max-w-[70%] px-4 py-3 border-2 border-[#121212] transition-all duration-200 ${
          isUser
            ? "bg-[#1040C0] text-white shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] hover:shadow-[5px_5px_0px_0px_rgba(18,18,18,1)]"
            : "bg-white text-[#121212] shadow-[3px_3px_0px_0px_rgba(18,18,18,1)] hover:shadow-[4px_4px_0px_0px_rgba(18,18,18,1)]"
        }`}
      >

        {isUser && (
          <button
            onClick={() => onEdit(index, content)}
            className="absolute -top-2 -right-2 bg-[#F0C020] p-1.5 border-2 border-[#121212] shadow-[2px_2px_0px_0px_rgba(18,18,18,1)] hover:bg-white active:translate-x-px active:translate-y-px active:shadow-none transition-all duration-200"
            title="Edit message"
          >
            <Edit2 className="w-3 h-3 text-[#121212]" strokeWidth={3} />
          </button>
        )}


        {!isUser && (
          <button
            onClick={handleCopy}
            className="absolute -top-2 -right-2 bg-[#F0C020] p-1.5 border-2 border-[#121212] shadow-[2px_2px_0px_0px_rgba(18,18,18,1)] hover:bg-white active:translate-x-px active:translate-y-px active:shadow-none transition-all duration-200"
            title={copied ? "Copied!" : "Copy message"}
          >
            {copied ? (
              <Check className="w-3 h-3 text-[#121212]" strokeWidth={3} />
            ) : (
              <Copy className="w-3 h-3 text-[#121212]" strokeWidth={3} />
            )}
          </button>
        )}

        
        {isUser ? (
          <div className="text-sm sm:text-base font-medium leading-relaxed">
            {content}
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            <MarkdownRenderer content={content} />
          </div>
        )}

   
        <div className={`absolute bottom-2 ${isUser ? 'left-2' : 'right-2'} w-2 h-2 ${
          isUser ? 'bg-[#F0C020]' : 'bg-[#1040C0] rounded-full'
        }`} />
      </div>

    
      {isUser && (
        <div className="w-10 h-10 bg-[#F0C020] border-2 border-[#121212] rounded-full flex items-center justify-center shrink-0 shadow-[3px_3px_0px_0px_rgba(18,18,18,1)]">
          <User className="w-5 h-5 text-[#121212]" strokeWidth={3} />
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;