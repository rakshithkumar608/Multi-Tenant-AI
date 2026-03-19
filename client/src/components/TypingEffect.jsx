import { useEffect, useState } from "react";

const TypingEffect = ({ text, speed = 20 }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="font-['Outfit'] font-medium text-[#121212] relative inline-block">
      {displayed}
     
      {displayed.length < text.length && (
        <span className="inline-block w-2 h-4 bg-[#1040C0] ml-0.5 animate-pulse" />
      )}
    </span>
  );
};

export default TypingEffect;