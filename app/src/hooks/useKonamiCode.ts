import { useState, useEffect } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const newSequence = [...sequence, key].slice(-KONAMI_SEQUENCE.length);
      setSequence(newSequence);
      
      const isMatch = KONAMI_SEQUENCE.every(
        (seqKey, i) => seqKey.toLowerCase() === newSequence[i]
      );
      
      if (isMatch) {
        setActivated(true);
        setTimeout(() => setActivated(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sequence]);

  return activated;
}
