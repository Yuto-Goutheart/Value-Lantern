import type { LanternData } from '../types';
import StepLayout from './StepLayout';
import { TextArea } from './FormField';

interface Props {
  data: LanternData['light'];
  onUpdate: (d: Partial<LanternData['light']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepLight({ data, onUpdate, onNext, onBack }: Props) {
  return (
    <StepLayout
      step={4}
      icon="✨"
      title="ステップ 4 — ライト（光の広がり）"
      description="光は周囲を照らします。あなたが価値観に沿って行動できたとき、どんな経験や感覚がありましたか？"
      onNext={onNext}
      onBack={onBack}
      nextLabel="完成へ →"
    >
      <TextArea
        label="価値観に沿って行動できた具体的な経験"
        value={data.situations}
        onChange={(v) => onUpdate({ situations: v })}
        placeholder="例：困難な状況で正直に話せた時、勇気を持って新しいことに挑戦した時..."
        rows={4}
      />
      <TextArea
        label="そのときの感覚・気持ち"
        value={data.feelings}
        onChange={(v) => onUpdate({ feelings: v })}
        placeholder="例：充実感、清々しさ、自分らしさを感じた..."
        rows={4}
      />
    </StepLayout>
  );
}
