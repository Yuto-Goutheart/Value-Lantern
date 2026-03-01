import { useState, useCallback, useEffect } from 'react';

interface UseSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  toggle: (text: string) => void;
}

/**
 * `> ` で始まる行をすべて抽出して結合する。
 * 引用マーカー（`> `）は除去して本文のみを返す。
 */
export function extractInstruction(text: string): string {
  const lines = text.split('\n');
  const instructionLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('> ')) {
      instructionLines.push(trimmed.slice(2).trim());
    } else if (trimmed === '>') {
      // 空の引用行 → 段落区切りとして空行を追加
      instructionLines.push('');
    }
  }

  return instructionLines.join('\n').trim();
}

export default function useSpeech(): UseSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // クリーンアップ
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();

    // `> ` インストラクションがあればそれだけ読む、なければ全文
    const instruction = extractInstruction(text);
    const toRead = instruction.length > 0 ? instruction : text;

    if (!toRead.trim()) return;

    const utterance = new SpeechSynthesisUtterance(toRead);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // 日本語音声を優先
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const ja = voices.find(
        (v) => v.lang === 'ja-JP' || v.lang === 'ja'
      );
      if (ja) utterance.voice = ja;
    };

    setVoice();
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = setVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend   = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const toggle = useCallback(
    (text: string) => {
      if (isSpeaking) {
        stop();
      } else {
        speak(text);
      }
    },
    [isSpeaking, speak, stop]
  );

  return { speak, stop, isSpeaking, toggle };
}
