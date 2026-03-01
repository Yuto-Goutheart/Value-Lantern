import type { LanternData } from '../types';
import LanternSVG from './LanternSVG';

interface Props {
  data: LanternData;
  onReset: () => void;
}

interface ResultItem { label: string; value: string; }

interface Section {
  icon: string;
  color: string;
  title: string;
  items: ResultItem[];
}

export default function ResultsScreen({ data, onReset }: Props) {
  const sections: Section[] = [
    {
      icon: '🔥',
      color: '#f97316',
      title: '炎 — 核心的価値観',
      items: [
        { label: '価値観 1', value: data.flame.value1 },
        { label: '重要な理由', value: (data.flame as { value1Desc?: string }).value1Desc ?? '' },
        { label: '価値観 2', value: data.flame.value2 },
        { label: '重要な理由', value: (data.flame as { value2Desc?: string }).value2Desc ?? '' },
      ].filter((i) => i.value),
    },
    {
      icon: '🪟',
      color: '#38bdf8',
      title: 'プロテクション — 価値観を守るもの',
      items: [
        { label: '守る行動・習慣', value: data.protection.actions },
        { label: 'サポートしてくれる人', value: data.protection.supporters },
      ].filter((i) => i.value),
    },
    {
      icon: '🤚',
      color: '#a78bfa',
      title: 'ハンドル — 外れるサイン',
      items: [
        { label: '外れたときのサイン', value: data.handle.situations },
        { label: '軌道修正の行動', value: data.handle.behaviors },
      ].filter((i) => i.value),
    },
    {
      icon: '✨',
      color: '#fbbf24',
      title: 'ライト — 価値観に沿った経験',
      items: [
        { label: '経験', value: data.light.situations },
        { label: '感覚・気持ち', value: data.light.feelings },
      ].filter((i) => i.value),
    },
    {
      icon: '🏮',
      color: '#34d399',
      title: 'クロージング — 振り返りと宣言',
      items: [
        { label: '気づき・宣言', value: data.closing.reflections },
      ].filter((i) => i.value),
    },
  ].filter((s) => s.items.length > 0);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '820px', margin: '0 auto' }}>

      {/* ヘッダー */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          fontWeight: 700,
          color: '#fbbf24',
          marginBottom: '0.5rem',
          textShadow: '0 0 24px rgba(251,191,36,0.3)',
        }}>
          🏮 あなたのバリューランタン
        </h2>
        {data.flame.value1 && data.flame.value2 ? (
          <p style={{ fontSize: '0.95rem', color: '#93c5fd' }}>
            <span style={{ color: '#fbbf24', fontWeight: 700 }}>「{data.flame.value1}」</span>
            {' '}と{' '}
            <span style={{ color: '#fbbf24', fontWeight: 700 }}>「{data.flame.value2}」</span>
            {' '}があなたの炎です。
          </p>
        ) : (
          <p style={{ fontSize: '0.95rem', color: '#93c5fd' }}>
            あなたの価値観の地図が完成しました。
          </p>
        )}
      </div>

      {/* ── メインコンテンツ: ランタン ＋ テキスト ── */}
      <div className="results-layout glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>

        {/* 左: ランタン図 */}
        <div className="results-lantern">
          <div style={{
            width: '100%',
            filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.45))',
          }} className="animate-glow">
            <div style={{ aspectRatio: '2/3' }}>
              <LanternSVG
                step={5}
                flameText={data.flame}
                glassText={data.protection}
                handleText={data.handle}
                lightText={data.light}
                size="large"
              />
            </div>
          </div>

          {/* ランタン部位ラベル */}
          <div style={{
            marginTop: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
          }}>
            {[
              { icon: '🔥', label: '炎：価値観の核心' },
              { icon: '🪟', label: 'ガラス：守るもの' },
              { icon: '🤚', label: 'ハンドル：外れるサイン' },
              { icon: '✨', label: 'ライト：輝く経験' },
            ].map((p) => (
              <div key={p.label} style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                fontSize: '0.7rem', color: '#6b7280',
              }}>
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 右: テキストサマリー */}
        <div className="results-content" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {sections.map((section) => (
            <div key={section.title} className="result-section"
              style={{ borderLeft: `3px solid ${section.color}` }}>
              <div className="result-section-title">
                <span>{section.icon}</span>
                <span>{section.title}</span>
              </div>
              {section.items.map((item) => (
                <div key={item.label}>
                  <div className="result-label">{item.label}</div>
                  <div className="result-value">{item.value}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>

      {/* ── ボタン群 ── */}
      <div className="no-print" style={{
        display: 'flex', gap: '0.75rem', justifyContent: 'center',
        flexWrap: 'wrap', paddingBottom: '2rem',
      }}>
        <button
          onClick={() => window.print()}
          className="btn-primary"
          style={{ fontSize: '0.9375rem' }}
        >
          🖨️ 印刷 / PDF保存
        </button>
        <button
          onClick={onReset}
          className="btn-secondary"
          style={{
            border: '1px solid rgba(251,191,36,0.2)',
          }}
        >
          やり直す
        </button>
      </div>
    </div>
  );
}
