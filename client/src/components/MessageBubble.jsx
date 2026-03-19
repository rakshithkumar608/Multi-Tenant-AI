import { motion } from "framer-motion";
import MarkdownRenderer from "./MarkdownRenderer"

const MessageBubble = ({ role, content, index, onEdit }) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 my-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          🤖
        </div>
      )}

      <div
        className={`relative max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow
        ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-white border text-gray-800"
        }`}
      >
        {/* ✏️ Edit */}
        {isUser && (
          <button
            onClick={() => onEdit(index, content)}
            className="absolute top-1 right-1 text-xs opacity-70"
          >
            ✏️
          </button>
        )}

        {/* 📋 Copy */}
        {!isUser && (
          <button
            onClick={() => navigator.clipboard.writeText(content)}
            className="absolute top-1 right-1 text-xs opacity-50"
          >
            📋
          </button>
        )}

        {isUser ? (
          content
        ) : (
          <div className="prose prose-sm max-w-none">
            <MarkdownRenderer content={content} />
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
          U
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;