import type { LanternData } from '../types';
import LanternSVG from './LanternSVG';

interface Props {
  data: LanternData;
  onReset: () => void;
}

interface SummarySection {
  icon: string;
  title: string;
  items: { label: string; value: string }[];
}

export default function ResultsScreen({ data, onReset }: Props) {
  const sections: SummarySection[] = [
    {
      icon: '🔥',
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
      title: 'プロテクション — 価値観を守るもの',
      items: [
        { label: '守る行動・習慣', value: data.protection.actions },
        { label: 'サポートしてくれる人', value: data.protection.supporters },
      ].filter((i) => i.value),
    },
    {
      icon: '🤚',
      title: 'ハンドル — 価値観から外れるサイン',
      items: [
        { label: '外れたときのサイン', value: data.handle.situations },
        { label: '軌道修正の行動', value: data.handle.behaviors },
      ].filter((i) => i.value),
    },
    {
      icon: '✨',
      title: 'ライト — 価値観に沿った行動の経験',
      items: [
        { label: '経験', value: data.light.situations },
        { label: '感覚・気持ち', value: data.light.feelings },
      ].filter((i) => i.value),
    },
    {
      icon: '🏮',
      title: 'クロージング — 振り返りと宣言',
      items: [
        { label: '気づき・宣言', value: data.closing.reflections },
      ].filter((i) => i.value),
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* ヘッダー */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-28 h-44 mb-4">
          <LanternSVG step={5} />
        </div>
        <h2 className="text-2xl font-bold text-amber-300 mb-2">あなたのバリューランタン</h2>
        <p className="text-blue-200 text-sm text-center max-w-sm">
          {data.flame.value1 && data.flame.value2 ? (
            <>
              <span className="text-amber-400 font-bold">「{data.flame.value1}」</span> と{' '}
              <span className="text-amber-400 font-bold">「{data.flame.value2}」</span> があなたの炎です。
            </>
          ) : (
            'あなたの価値観の地図が完成しました。'
          )}
        </p>
      </div>

      {/* サマリーカード */}
      <div className="space-y-4 mb-6">
        {sections.map((section) =>
          section.items.length > 0 ? (
            <div
              key={section.title}
              className="bg-gray-800 bg-opacity-80 rounded-xl p-4 border border-gray-700"
            >
              <h3 className="text-amber-300 font-semibold mb-3 flex items-center gap-2">
                <span>{section.icon}</span>
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.label}>
                    <span className="text-gray-400 text-xs">{item.label}</span>
                    <p className="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* ボタン群 */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          🖨 印刷 / PDF
        </button>
        <button
          onClick={onReset}
          className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-bold py-2 px-6 rounded-full transition-colors"
        >
          やり直す
        </button>
      </div>
    </div>
  );
}
