import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * RAF-based typewriter effect for smooth character-by-character text reveal.
 * Markdown-aware: won't break mid-tag.
 */
export function useTypewriter(text, { speed = 15, enabled = true } = {}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);

  const findSafeIndex = useCallback(
    (idx) => {
      if (!text) return idx;

      // Don't break inside markdown formatting tokens
      const dangerzones = ['**', '##', '```', '`', '__', '~~'];
      for (const token of dangerzones) {
        const start = text.lastIndexOf(token, idx);
        if (start >= 0 && start + token.length > idx) {
          return start;
        }
      }
      return idx;
    },
    [text]
  );

  useEffect(() => {
    if (!enabled || !text) {
      setDisplayedText(text || '');
      setIsComplete(true);
      return;
    }

    indexRef.current = 0;
    setDisplayedText('');
    setIsComplete(false);
    lastTimeRef.current = 0;

    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;

      if (delta >= speed) {
        const charsToAdd = Math.max(1, Math.floor(delta / speed));
        indexRef.current = Math.min(indexRef.current + charsToAdd, text.length);
        const safeIdx = findSafeIndex(indexRef.current);
        setDisplayedText(text.slice(0, safeIdx));
        lastTimeRef.current = timestamp;

        if (indexRef.current >= text.length) {
          setDisplayedText(text);
          setIsComplete(true);
          return;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, speed, enabled, findSafeIndex]);

  const skipToEnd = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setDisplayedText(text || '');
    setIsComplete(true);
  }, [text]);

  return { displayedText, isComplete, skipToEnd };
}
