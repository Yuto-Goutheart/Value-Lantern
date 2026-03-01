import LanternSVG from './LanternSVG';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-32 h-48 mb-8">
        <LanternSVG step={0} />
      </div>
      <h1 className="text-4xl font-bold text-amber-300 mb-3 text-center">バリューランタン</h1>
      <p className="text-blue-200 text-center max-w-md mb-2 leading-relaxed">
        ブレネー・ブラウン考案のワークシート
      </p>
      <p className="text-blue-300 text-center max-w-md mb-8 leading-relaxed text-sm">
        5つのステップを通じて、あなたの核心的な価値観を照らし出します。<br />
        入力内容はブラウザに自動保存され、いつでも続きから再開できます。
      </p>
      <button
        onClick={onStart}
        className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-200 animate-glow shadow-lg"
      >
        ワークを始める
      </button>
    </div>
  );
}
