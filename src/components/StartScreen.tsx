import LanternSVG from './LanternSVG';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
    }} className="animate-fade-only">

      {/* 背景グロー */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(251,191,36,0.08) 0%, transparent 70%)',
      }} />

      {/* ランタン */}
      <div style={{ width: '160px', height: '240px', marginBottom: '2rem' }}
        className="animate-float animate-glow">
        <LanternSVG step={0} />
      </div>

      {/* タイトル */}
      <h1 style={{
        fontSize: 'clamp(2rem, 6vw, 3rem)',
        fontWeight: 700,
        color: '#fbbf24',
        marginBottom: '0.5rem',
        letterSpacing: '0.04em',
        textShadow: '0 0 30px rgba(251,191,36,0.4)',
        fontFamily: "'Noto Sans JP', sans-serif",
      }}>
        バリューランタン
      </h1>

      <p style={{ fontSize: '0.95rem', color: '#93c5fd', marginBottom: '0.5rem' }}>
        ブレネー・ブラウン考案のワークシート
      </p>

      <p style={{
        fontSize: '0.875rem', color: '#6b7280',
        maxWidth: '380px', lineHeight: 1.75, marginBottom: '2.5rem',
      }}>
        5つのステップを通じて、あなたの核心的な価値観を照らし出します。<br />
        入力内容はブラウザに自動保存され、いつでも続きから再開できます。
      </p>

      {/* CTA ボタン */}
      <button
        onClick={onStart}
        className="btn-primary animate-pulse-amber"
        style={{ fontSize: '1.0625rem', padding: '0.75rem 2.5rem', letterSpacing: '0.04em' }}
      >
        🏮 ワークを始める
      </button>

      {/* ステップ概要 */}
      <div style={{
        display: 'flex', gap: '1.25rem', flexWrap: 'wrap',
        justifyContent: 'center', marginTop: '3rem',
        maxWidth: '480px',
      }}>
        {[
          { icon: '🔥', label: '炎', desc: 'コアな価値観' },
          { icon: '🪟', label: 'ガラス', desc: '守るもの' },
          { icon: '🤚', label: 'ハンドル', desc: '外れるサイン' },
          { icon: '✨', label: 'ライト', desc: '輝く経験' },
          { icon: '🏮', label: 'クロージング', desc: '決意表明' },
        ].map((s) => (
          <div key={s.label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '0.25rem',
            padding: '0.75rem',
            borderRadius: '0.75rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(251,191,36,0.1)',
            minWidth: '72px',
          }}>
            <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
            <span style={{ fontSize: '0.75rem', color: '#fcd34d', fontWeight: 600 }}>{s.label}</span>
            <span style={{ fontSize: '0.65rem', color: '#6b7280' }}>{s.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
