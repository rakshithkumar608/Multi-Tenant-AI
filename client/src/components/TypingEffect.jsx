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
  }, [text]);

  return <span>{displayed}</span>;
};

export default TypingEffect;