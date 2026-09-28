import { useState, useEffect, useRef, useCallback } from 'react';

export function useSpeech() {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentParagraph, setCurrentParagraph] = useState<number | null>(null);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [rate, setRate] = useState<number>(0.95); // slightly relaxed natural pace
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);

        // Find Indonesian voice or nice fallback
        const idVoice = availableVoices.find(v => v.lang.startsWith('id') || v.lang.includes('ID'));
        if (idVoice) {
          setSelectedVoice(idVoice);
        } else if (availableVoices.length > 0) {
          setSelectedVoice(availableVoices[0]);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentParagraph(null);
      setCurrentWord('');
    }
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const speakParagraph = useCallback((text: string, paragraphIndex: number, onEnd?: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.lang = selectedVoice?.lang || 'id-ID';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setCurrentParagraph(paragraphIndex);
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const word = text.substring(event.charIndex, event.charIndex + (event.charLength || 10)).split(/\s+/)[0];
        setCurrentWord(word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, ''));
      }
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentParagraph(null);
      setCurrentWord('');
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentParagraph(null);
      setCurrentWord('');
    };

    window.speechSynthesis.speak(utterance);
  }, [selectedVoice, rate]);

  // Tap-to-pronounce single word
  const speakWord = useCallback((word: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(word);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.lang = selectedVoice?.lang || 'id-ID';
    utterance.rate = rate * 0.9;
    window.speechSynthesis.speak(utterance);
  }, [selectedVoice, rate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isSupported,
    isSpeaking,
    isPaused,
    currentParagraph,
    currentWord,
    rate,
    setRate,
    voices,
    selectedVoice,
    setSelectedVoice,
    speakParagraph,
    speakWord,
    pause,
    resume,
    stop
  };
}
