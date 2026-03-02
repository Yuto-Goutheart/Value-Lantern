import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export const SESSION_KEY = 'vl-gcloud-tts-key';

interface SpeechContextValue {
    apiKey: string;
    setApiKey: (key: string) => void;
    requestApiKey: (onReady: () => void) => void;
    pendingCallback: (() => void) | null;
    clearPendingCallback: () => void;
}

export const SpeechContext = createContext<SpeechContextValue | null>(null);

export function SpeechProvider({ children }: { children: ReactNode }) {
    const [apiKey, setApiKeyState] = useState<string>(
        () => sessionStorage.getItem(SESSION_KEY) ?? ''
    );
    const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

    const setApiKey = useCallback((key: string) => {
        sessionStorage.setItem(SESSION_KEY, key);
        setApiKeyState(key);
    }, []);

    /**
     * APIキーが既にあれば onReady() を即時実行。
     * なければモーダルが表示されるよう pendingCallback に保存する。
     */
    const requestApiKey = useCallback(
        (onReady: () => void) => {
            const stored = sessionStorage.getItem(SESSION_KEY) ?? '';
            if (stored) {
                onReady();
            } else {
                setPendingCallback(() => onReady);
            }
        },
        []
    );

    const clearPendingCallback = useCallback(() => {
        setPendingCallback(null);
    }, []);

    return (
        <SpeechContext.Provider value={{ apiKey, setApiKey, requestApiKey, pendingCallback, clearPendingCallback }}>
            {children}
        </SpeechContext.Provider>
    );
}

/**
 * SpeechContext を取得する。プロバイダー外で使うと throw する。
 */
export function useSpeechContext(): SpeechContextValue {
    const ctx = useContext(SpeechContext);
    if (!ctx) throw new Error('useSpeechContext must be used inside <SpeechProvider>');
    return ctx;
}
