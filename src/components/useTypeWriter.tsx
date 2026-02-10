import { useEffect, useState } from "react";

export function useTypeWriter(text: string, speed = 25) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex >= text.length) return;

    const t = window.setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    return () => window.clearTimeout(t);
  }, [text, speed, currentIndex]);

  const done = currentIndex >= text.length;

  const revealAll = () => {
    setDisplayedText(text);
    setCurrentIndex(text.length);
  };

  return { displayedText, done, revealAll };
}
