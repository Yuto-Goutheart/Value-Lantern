import { useState, useCallback, useRef, useEffect } from 'react';
import { useSpeechContext, SESSION_KEY } from '../contexts/SpeechContext';

interface UseSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  toggle: (text: string) => void;
}

const TTS_ENDPOINT = 'https://texttospeech.googleapis.com/v1/text:synthesize';

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

/**
 * Google Cloud Text-to-Speech (Standard) を使って音声読み上げを行うフック。
 * APIキーは SpeechContext から取得する。
 * キー未設定の場合は requestApiKey() で入力モーダルをトリガーする。
 */
export default function useSpeech(): UseSpeechReturn {
  const { apiKey, requestApiKey } = useSpeechContext();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // クリーンアップ
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    async (text: string) => {
      stop();

      // `> ` インストラクションがあればそれだけ読む、なければ全文
      const instruction = extractInstruction(text);
      const toRead = instruction.length > 0 ? instruction : text;
      if (!toRead.trim()) return;

      const currentKey = apiKey || (sessionStorage.getItem(SESSION_KEY) ?? '');
      if (!currentKey) {
        requestApiKey(() => speak(text));
        return;
      }

      setIsSpeaking(true);

      try {
        const response = await fetch(`${TTS_ENDPOINT}?key=${encodeURIComponent(currentKey)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text: toRead },
            voice: {
              languageCode: 'ja-JP',
              name: 'ja-JP-Standard-A',
              ssmlGender: 'FEMALE',
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate: 0.95,
            },
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          console.error('[TTS] API error:', response.status, errData);
          setIsSpeaking(false);
          return;
        }

        const data = await response.json() as { audioContent: string };
        const base64 = data.audioContent;
        const byteChars = atob(base64);
        const byteArray = new Uint8Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) {
          byteArray[i] = byteChars.charCodeAt(i);
        }
        const blob = new Blob([byteArray], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);

        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onended = () => {
          URL.revokeObjectURL(url);
          setIsSpeaking(false);
        };
        audio.onerror = () => {
          URL.revokeObjectURL(url);
          setIsSpeaking(false);
        };

        await audio.play();
      } catch (err) {
        console.error('[TTS] fetch error:', err);
        setIsSpeaking(false);
      }
    },
    [apiKey, requestApiKey, stop]
  );

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
