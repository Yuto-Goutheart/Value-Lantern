import LanternSVG from './LanternSVG';
import type { Step } from '../types';

interface StepLayoutProps {
  step: Step;
  icon: string;
  title: string;
  description: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}

const STEP_LABELS: Record<Step, string> = {
  1: '炎',
  2: 'プロテクション',
  3: 'ハンドル',
  4: 'ライト',
  5: 'クロージング',
};

export default function StepLayout({
  step,
  icon,
  title,
  description,
  children,
  onNext,
  onBack,
  nextLabel = '次へ →',
  nextDisabled = false,
}: StepLayoutProps) {
  return (
    <div className="animate-fade-in">
      {/* ランタン */}
      <div className="flex justify-center mb-6">
        <div className="w-28 h-44">
          <LanternSVG step={step} />
        </div>
      </div>

      {/* ステップインジケーター */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {([1, 2, 3, 4, 5] as Step[]).map((s) => (
          <div key={s} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                s === step
                  ? 'bg-amber-400 text-gray-900 shadow-lg scale-110'
                  : s < step
                  ? 'bg-amber-700 text-amber-200'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {s < step ? '✓' : s}
            </div>
            <span className={`text-xs mt-1 ${s === step ? 'text-amber-300' : 'text-gray-500'}`}>
              {STEP_LABELS[s]}
            </span>
          </div>
        ))}
      </div>

      {/* カード */}
      <div className="bg-gray-800 bg-opacity-80 rounded-2xl p-6 shadow-xl border border-gray-700">
        <div className="flex items-start gap-3 mb-5">
          <span className="text-3xl">{icon}</span>
          <div>
            <h2 className="text-xl font-bold text-amber-300">{title}</h2>
            <p className="text-blue-200 text-sm mt-1 leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="space-y-4">{children}</div>

        {/* ナビゲーション */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={onBack}
            disabled={!onBack}
            className="text-gray-400 hover:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-4 py-2"
          >
            ← 戻る
          </button>
          <span className="text-gray-500 text-sm">{step} / 5</span>
          <button
            onClick={onNext}
            disabled={nextDisabled}
            className="bg-amber-500 hover:bg-amber-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-900 disabled:text-gray-400 font-bold py-2 px-6 rounded-full transition-all duration-200"
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
