import LanternSVG from './LanternSVG';
import type { Step } from '../types';
import type { LanternData } from '../types';
import useSpeech, { extractInstruction } from '../hooks/useSpeech';

interface StepLayoutProps {
  step: Step;
  icon: string;
  title: string;
  description: string;
  /** `> ` から始まるインストラクション文（省略可）*/
  instruction?: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  data?: LanternData;
}

const STEP_LABELS: Record<Step, string> = {
  1: '炎', 2: 'プロテクション', 3: 'ハンドル', 4: 'ライト', 5: 'クロージング',
};

export default function StepLayout({
  step, icon, title, description, instruction,
  children, onNext, onBack,
  nextLabel = '次へ →', nextDisabled = false, data,
}: StepLayoutProps) {
  const { isSpeaking, toggle } = useSpeech();

  // 音声ターゲット: instruction があればそちらを使う（> 抽出済み文字列）
  const speechTarget = instruction ?? description;

  // 表示用に > を解除したインストラクション本文
  const instructionBody = instruction ? extractInstruction(instruction) : null;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '680px', margin: '0 auto' }}>

      {/* ランタン */}
      <div className="flex justify-center mb-5" style={{ filter: 'drop-shadow(0 0 18px rgba(251,191,36,0.35))' }}>
        <div style={{ width: '108px', height: '170px' }} className="animate-float">
          <LanternSVG
            step={step}
            flameText={data?.flame}
            glassText={data?.protection}
            handleText={data?.handle}
            lightText={data?.light}
          />
        </div>
      </div>

      {/* ステップインジケーター */}
      <div className="step-indicator flex items-center justify-center gap-3 mb-6">
        {([1, 2, 3, 4, 5] as Step[]).map((s) => (
          <div key={s} className="flex flex-col items-center gap-1">
            <div className={`step-dot ${s === step ? 'active' : s < step ? 'done' : 'future'}`}>
              {s < step ? '✓' : s}
            </div>
            <span style={{
              fontSize: '0.65rem',
              color: s === step ? '#fbbf24' : '#4b5563',
              transition: 'color 0.3s',
            }}>
              {STEP_LABELS[s]}
            </span>
          </div>
        ))}
      </div>

      {/* カード */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>

        {/* タイトル行 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.125rem' }}>
          <span style={{ fontSize: '2rem', lineHeight: 1 }}>{icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fcd34d', margin: 0 }}>{title}</h2>
              <button
                onClick={() => toggle(speechTarget)}
                className={`btn-speech ${isSpeaking ? 'speaking' : 'idle'}`}
                title={isSpeaking ? '読み上げを停止' : 'インストラクションを読み上げ'}
                aria-label={isSpeaking ? '読み上げを停止' : 'インストラクションを読み上げ'}
              >
                {isSpeaking ? '🔊' : '🔈'}
              </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#93c5fd', marginTop: '0.25rem', lineHeight: 1.65 }}>
              {description}
            </p>
          </div>
        </div>

        {/* インストラクション引用ブロック */}
        {instructionBody && (
          <div className="instruction-block">
            <p>{instructionBody}</p>
          </div>
        )}

        {/* フォームフィールド */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {children}
        </div>

        {/* ナビゲーション */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: '1.5rem', paddingTop: '1rem',
          borderTop: '1px solid rgba(251,191,36,0.12)',
        }}>
          <button onClick={onBack} disabled={!onBack} className="btn-secondary">
            ← 戻る
          </button>
          <span style={{ fontSize: '0.8rem', color: '#4b5563' }}>{step} / 5</span>
          <button onClick={onNext} disabled={nextDisabled} className="btn-primary">
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
