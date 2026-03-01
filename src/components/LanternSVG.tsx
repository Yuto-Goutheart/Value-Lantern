type LanternStep = 0 | 1 | 2 | 3 | 4 | 5;

interface LanternSVGProps {
  step: LanternStep;
}

export default function LanternSVG({ step }: LanternSVGProps) {
  const highlight = (part: 'flame' | 'glass' | 'handle' | 'light') => {
    const active: Record<LanternStep, string> = {
      0: '',
      1: 'flame',
      2: 'glass',
      3: 'handle',
      4: 'light',
      5: 'all',
    };
    return active[step] === part || active[step] === 'all';
  };

  return (
    <svg
      viewBox="0 0 200 300"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ランタンのイラスト"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="flameGradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ff6600" />
          <stop offset="50%" stopColor="#ffaa00" />
          <stop offset="100%" stopColor="#fff176" />
        </linearGradient>
        <radialGradient id="flameGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffdd00" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="glassGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a8d8ea" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#e8f4f8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a8d8ea" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="lightGradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffe066" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffe066" stopOpacity="0" />
        </radialGradient>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 光の広がり */}
      <g opacity={highlight('light') ? 1 : 0.15} style={{ transition: 'opacity 0.5s' }}>
        <ellipse cx="100" cy="155" rx="85" ry="95" fill="url(#lightGradient)" />
        {highlight('light') && (
          <ellipse cx="100" cy="155" rx="85" ry="95" fill="url(#lightGradient)">
            <animate attributeName="rx" values="85;95;85" dur="2s" repeatCount="indefinite" />
            <animate attributeName="ry" values="95;108;95" dur="2s" repeatCount="indefinite" />
          </ellipse>
        )}
      </g>

      {/* ガラス部分 */}
      <rect
        x="80" y="101" width="40" height="145" rx="2"
        fill="url(#glassGradient)"
        opacity={highlight('glass') ? 0.95 : 0.6}
        style={{ transition: 'opacity 0.5s' }}
        filter={highlight('glass') ? 'url(#glowFilter)' : undefined}
      />
      {highlight('glass') && (
        <rect x="80" y="101" width="40" height="145" rx="2" fill="none"
          stroke="#a8d8ea" strokeWidth="2" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </rect>
      )}

      {/* ランタン本体フレーム */}
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

      {/* 取っ手 */}
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
        filter={highlight('handle') ? 'url(#glowFilter)' : undefined}
      />

      {/* 炎 */}
      <g opacity={step === 0 ? 0.4 : 1} style={{ transition: 'opacity 0.5s' }}>
        <ellipse
          cx="100" cy="178" rx="14" ry="14"
          fill="url(#flameGlow)"
          opacity={highlight('flame') ? 0.8 : 0.4}
          style={{ transition: 'opacity 0.5s' }}
        />
        <path
          d="M100 155 C94 165 90 172 92 180 C94 188 106 188 108 180 C110 172 106 165 100 155 Z"
          fill="url(#flameGradient)"
          filter={highlight('flame') ? 'url(#glowFilter)' : undefined}
        >
          {highlight('flame') && (
            <animate attributeName="d"
              values="M100 155 C94 165 90 172 92 180 C94 188 106 188 108 180 C110 172 106 165 100 155 Z;M100 158 C95 167 91 173 93 181 C95 189 105 189 107 181 C109 173 105 167 100 158 Z;M100 155 C94 165 90 172 92 180 C94 188 106 188 108 180 C110 172 106 165 100 155 Z"
              dur="1.5s" repeatCount="indefinite" />
          )}
        </path>
        <path
          d="M100 162 C97 168 96 173 97.5 178 C99 183 101 183 102.5 178 C104 173 103 168 100 162 Z"
          fill="#fff5c0"
          opacity="0.8"
        />
      </g>
    </svg>
  );
}
