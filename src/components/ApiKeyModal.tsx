import { useState, useEffect, useRef } from 'react';
import { useSpeechContext } from '../contexts/SpeechContext';

interface Props {
    onClose: () => void;
}

export default function ApiKeyModal({ onClose }: Props) {
    const { setApiKey, pendingCallback, clearPendingCallback } = useSpeechContext();
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) {
            setError('APIキーを入力してください');
            return;
        }
        setApiKey(trimmed);
        if (pendingCallback) {
            pendingCallback();
            clearPendingCallback();
        }
        onClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSubmit();
        if (e.key === 'Escape') {
            clearPendingCallback();
            onClose();
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(4px)',
                padding: '1rem',
            }}
            onClick={(e) => { if (e.target === e.currentTarget) { clearPendingCallback(); onClose(); } }}
        >
            <div
                style={{
                    background: 'linear-gradient(135deg, rgba(30,27,75,0.97) 0%, rgba(15,23,42,0.97) 100%)',
                    border: '1px solid rgba(251,191,36,0.25)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '420px',
                    boxShadow: '0 0 40px rgba(251,191,36,0.12), 0 24px 48px rgba(0,0,0,0.6)',
                }}
            >
                {/* ヘッダー */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>🔑</span>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#fcd34d' }}>
                            Google Cloud TTS APIキー
                        </h3>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                            このセッション中のみ保持されます
                        </p>
                    </div>
                </div>

                {/* 説明 */}
                <p style={{ fontSize: '0.82rem', color: '#93c5fd', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                    音声読み上げには Google Cloud Text-to-Speech（Standard）を使用します。
                    <a
                        href="https://console.cloud.google.com/apis/credentials"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#fbbf24', marginLeft: '0.25rem', textDecoration: 'underline' }}
                    >
                        APIキーを取得 →
                    </a>
                </p>

                {/* 入力フィールド */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                        APIキー
                    </label>
                    <input
                        ref={inputRef}
                        type="password"
                        value={inputValue}
                        onChange={(e) => { setInputValue(e.target.value); setError(''); }}
                        onKeyDown={handleKeyDown}
                        placeholder="AIza..."
                        style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '0.6rem 0.875rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: `1px solid ${error ? '#f87171' : 'rgba(251,191,36,0.2)'}`,
                            borderRadius: '0.5rem',
                            color: '#e2e8f0',
                            fontSize: '0.9rem',
                            outline: 'none',
                            fontFamily: 'monospace',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#fbbf24')}
                        onBlur={(e) => (e.target.style.borderColor = error ? '#f87171' : 'rgba(251,191,36,0.2)')}
                    />
                    {error && (
                        <p style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: '#f87171' }}>{error}</p>
                    )}
                </div>

                {/* ボタン */}
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                    <button
                        onClick={() => { clearPendingCallback(); onClose(); }}
                        style={{
                            padding: '0.55rem 1.1rem',
                            fontSize: '0.85rem',
                            borderRadius: '0.5rem',
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)')}
                        onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)')}
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSubmit}
                        style={{
                            padding: '0.55rem 1.25rem',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            borderRadius: '0.5rem',
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            border: 'none',
                            color: '#1a0a00',
                            cursor: 'pointer',
                            boxShadow: '0 0 14px rgba(251,191,36,0.3)',
                            transition: 'box-shadow 0.2s, transform 0.1s',
                        }}
                        onMouseEnter={(e) => { const b = e.target as HTMLButtonElement; b.style.boxShadow = '0 0 22px rgba(251,191,36,0.55)'; b.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={(e) => { const b = e.target as HTMLButtonElement; b.style.boxShadow = '0 0 14px rgba(251,191,36,0.3)'; b.style.transform = 'translateY(0)'; }}
                    >
                        🔊 保存して読み上げ
                    </button>
                </div>
            </div>
        </div>
    );
}
