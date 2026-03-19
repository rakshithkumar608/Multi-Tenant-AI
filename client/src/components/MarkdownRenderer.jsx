import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const MarkdownRenderer = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="font-['Outfit'] prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}  // ✅ NO className here
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            const blockIndex = codeString;

            return !inline && match ? (
              <div className="relative my-4 border-2 border-[#121212] shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] overflow-hidden">

                {/* Header */}
                <div className="bg-[#121212] px-4 py-2 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-yellow-400 uppercase">
                    {match[1]}
                  </span>

                  <button
                    onClick={() => handleCopy(codeString, blockIndex)}
                    className="text-xs bg-yellow-400 px-2 py-1 border border-black"
                  >
                    {copiedIndex === blockIndex ? "Copied" : "Copy"}
                  </button>
                </div>

                {/* Code */}
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    background: "#121212",
                  }}
                  {...props}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="bg-yellow-200 px-1 border border-black text-sm">
                {children}
              </code>
            );
          },

          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mt-6 mb-4 border-b-2 border-black">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mt-5 mb-3">
              {children}
            </h2>
          ),

          p: ({ children }) => (
            <p className="text-sm my-2 leading-relaxed">
              {children}
            </p>
          ),

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {children}
            </a>
          ),

          li: ({ children }) => (
            <li className="ml-4 list-disc">{children}</li>
          ),

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-3 my-3 italic">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;