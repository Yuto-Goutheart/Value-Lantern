type LanternStep = 0 | 1 | 2 | 3 | 4 | 5;

interface FlameText { value1: string; value2: string; }
interface GlassText { actions: string; supporters: string; }
interface HandleText { situations: string; behaviors: string; }
interface LightText { situations: string; outcomes: string; feelings: string; }

interface LanternSVGProps {
  step: LanternStep;
  flameText?: FlameText;
  glassText?: GlassText;
  handleText?: HandleText;
  lightText?: LightText;
  /** 'large' → results screen big view (no text overlaid, clean SVG) */
  size?: 'normal' | 'large';
}

function truncateText(text: string, maxLength: number = 15): string {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
}

export default function LanternSVG({
  step, flameText, glassText, handleText, lightText, size = 'normal',
}: LanternSVGProps) {
  const isLarge = size === 'large';

  const highlight = (part: 'flame' | 'glass' | 'handle' | 'light') => {
    const active: Record<LanternStep, string> = {
      0: '', 1: 'flame', 2: 'glass', 3: 'handle', 4: 'light', 5: 'all',
    };
    return active[step] === part || active[step] === 'all';
  };

  const hasFlame = !!(flameText?.value1 || flameText?.value2);
  const hasGlass = !!(glassText?.actions || glassText?.supporters);
  const hasHandle = !!(handleText?.situations || handleText?.behaviors);
  const hasLight = !!(lightText?.situations || lightText?.feelings);

  return (
    <svg
      viewBox="0 0 200 300"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="バリューランタンのイラスト"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ff6600" />
          <stop offset="50%" stopColor="#ffaa00" />
          <stop offset="100%" stopColor="#fff176" />
        </linearGradient>
        <radialGradient id="flameGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffdd00" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a8d8ea" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#e8f4f8" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#a8d8ea" stopOpacity="0.45" />
        </linearGradient>
        <radialGradient id="lightGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffe066" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffe066" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glowStrong">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── 光の広がり ── */}
      <g opacity={highlight('light') ? 1 : 0.15} style={{ transition: 'opacity 0.5s' }}>
        <ellipse cx="100" cy="155" rx="85" ry="95" fill="url(#lightGrad)" />
        {highlight('light') && (
          <ellipse cx="100" cy="155" rx="85" ry="95" fill="url(#lightGrad)">
            <animate attributeName="rx" values="85;97;85" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="ry" values="95;110;95" dur="2.2s" repeatCount="indefinite" />
          </ellipse>
        )}
      </g>

      {/* ── ガラス ── */}
      <rect
        x="80" y="101" width="40" height="145" rx="2"
        fill="url(#glassGrad)"
        opacity={highlight('glass') ? 0.95 : 0.6}
        style={{ transition: 'opacity 0.5s' }}
        filter={highlight('glass') ? 'url(#glow)' : undefined}
      />
      {highlight('glass') && (
        <rect x="80" y="101" width="40" height="145" rx="2" fill="none"
          stroke="#a8d8ea" strokeWidth="2" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </rect>
      )}

      {/* ── 本体フレーム ── */}
      {/* 下部ベース */}
      <rect x="70" y="245" width="60" height="12" rx="4" fill="#8B6914" stroke="#5a4009" strokeWidth="1.5" />
      <rect x="80" y="257" width="10" height="10" rx="2" fill="#8B6914" stroke="#5a4009" strokeWidth="1" />
      <rect x="110" y="257" width="10" height="10" rx="2" fill="#8B6914" stroke="#5a4009" strokeWidth="1" />
      {/* 上部キャップ */}
      <rect x="72" y="90" width="56" height="12" rx="4" fill="#8B6914" stroke="#5a4009" strokeWidth="1.5" />
      <rect x="91" y="75" width="18" height="16" rx="3" fill="#8B6914" stroke="#5a4009" strokeWidth="1.5" />
      {/* トップ飾り */}
      <circle cx="100" cy="70" r="7" fill="#8B6914" stroke="#5a4009" strokeWidth="1.5" />
      <circle cx="100" cy="70" r="3" fill="#D4A017" />
      {/* 縦フレーム */}
      <rect x="72" y="100" width="8" height="147" rx="3" fill="#8B6914" stroke="#5a4009" strokeWidth="1" />
      <rect x="120" y="100" width="8" height="147" rx="3" fill="#8B6914" stroke="#5a4009" strokeWidth="1" />
      <rect x="86" y="100" width="6" height="147" rx="2" fill="#9a7520" stroke="#5a4009" strokeWidth="0.8" />
      <rect x="108" y="100" width="6" height="147" rx="2" fill="#9a7520" stroke="#5a4009" strokeWidth="0.8" />

      {/* ── 取っ手 ── */}
      <path
        d="M128 130 C150 130 158 145 158 160 C158 175 150 180 128 180"
        fill="none"
        stroke={highlight('handle') ? '#D4A017' : '#8B6914'}
        strokeWidth="7"
        strokeLinecap="round"
        style={{ transition: 'stroke 0.5s' }}
      />
      <path
        d="M128 130 C150 130 158 145 158 160 C158 175 150 180 128 180"
        fill="none"
        stroke={highlight('handle') ? '#fff9c4' : '#D4A017'}
        strokeWidth="3.5"
        strokeLinecap="round"
        style={{ transition: 'stroke 0.5s' }}
        filter={highlight('handle') ? 'url(#glow)' : undefined}
      />

      {/* ── 炎 ── */}
      <g opacity={step === 0 ? 0.4 : 1} style={{ transition: 'opacity 0.5s' }}>
        <ellipse
          cx="100" cy="178" rx="14" ry="14"
          fill="url(#flameGlow)"
          opacity={highlight('flame') ? 0.85 : 0.4}
          style={{ transition: 'opacity 0.5s' }}
        />
        <path
          d="M100 155 C94 165 90 172 92 180 C94 188 106 188 108 180 C110 172 106 165 100 155 Z"
          fill="url(#flameGrad)"
          filter={highlight('flame') ? 'url(#glowStrong)' : undefined}
        >
          {highlight('flame') && (
            <animate attributeName="d"
              values="M100 155 C94 165 90 172 92 180 C94 188 106 188 108 180 C110 172 106 165 100 155 Z;M100 158 C95 167 91 173 93 181 C95 189 105 189 107 181 C109 173 105 167 100 158 Z;M100 155 C94 165 90 172 92 180 C94 188 106 188 108 180 C110 172 106 165 100 155 Z"
              dur="1.5s" repeatCount="indefinite" />
          )}
        </path>
        <path
          d="M100 162 C97 168 96 173 97.5 178 C99 183 101 183 102.5 178 C104 173 103 168 100 162 Z"
          fill="#fff5c0" opacity="0.85"
        />
      </g>

      {/* ── テキスト表示（normal サイズのみ） ── */}
      {!isLarge && (
        <>
          {/* 光テキスト */}
          {hasLight && (
            <g fill="#fff" fontSize="5" textAnchor="middle"
              style={{ opacity: highlight('light') ? 1 : 0.5 }}>
              {lightText?.situations && (
                <text x="165" y="120" fontWeight={highlight('light') ? 'bold' : 'normal'}>
                  {truncateText(lightText.situations, 12)}
                </text>
              )}
              {lightText?.feelings && (
                <text x="165" y="133" fontWeight={highlight('light') ? 'bold' : 'normal'}>
                  {truncateText(lightText.feelings, 12)}
                </text>
              )}
            </g>
          )}

          {/* ガラステキスト */}
          {hasGlass && (
            <g fill="#333" fontSize="4.5" textAnchor="middle"
              style={{ opacity: highlight('glass') ? 1 : 0.5 }}>
              {glassText?.actions && (
                <text x="100" y="148" fontWeight={highlight('glass') ? 'bold' : 'normal'}>
                  {truncateText(glassText.actions, 10)}
                </text>
              )}
              {glassText?.supporters && (
                <text x="100" y="162" fontWeight={highlight('glass') ? 'bold' : 'normal'}>
                  {truncateText(glassText.supporters, 10)}
                </text>
              )}
            </g>
          )}

          {/* 取っ手テキスト */}
          {hasHandle && (
            <g fill="#fff" fontSize="4.5" textAnchor="middle"
              style={{ opacity: highlight('handle') ? 1 : 0.5 }}>
              {handleText?.situations && (
                <text x="161" y="148" fontWeight={highlight('handle') ? 'bold' : 'normal'}>
                  {truncateText(handleText.situations, 10)}
                </text>
              )}
              {handleText?.behaviors && (
                <text x="161" y="162" fontWeight={highlight('handle') ? 'bold' : 'normal'}>
                  {truncateText(handleText.behaviors, 10)}
                </text>
              )}
            </g>
          )}

          {/* 炎テキスト */}
          {hasFlame && (
            <g fill="#fff" fontSize="5" textAnchor="middle" fontWeight="bold"
              style={{ opacity: highlight('flame') ? 1 : 0.5 }}>
              {flameText?.value1 && (
                <text x="100" y="198" fontWeight={highlight('flame') ? 'bold' : 'normal'}>
                  {truncateText(flameText.value1, 12)}
                </text>
              )}
              {flameText?.value2 && (
                <text x="100" y="210" fontWeight={highlight('flame') ? 'bold' : 'normal'}>
                  {truncateText(flameText.value2, 12)}
                </text>
              )}
            </g>
          )}
        </>
      )}
    </svg>
  );
}
