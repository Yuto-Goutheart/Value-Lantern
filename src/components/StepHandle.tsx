import type { LanternData } from '../types';
import StepLayout from './StepLayout';
import { TextArea } from './FormField';

interface Props {
  data: LanternData['handle'];
  onUpdate: (d: Partial<LanternData['handle']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepHandle({ data, onUpdate, onNext, onBack }: Props) {
  return (
    <StepLayout
      step={3}
      icon="🤚"
      title="ステップ 3 — ハンドル（取っ手）"
      description="取っ手はランタンを持ち運ぶ手がかりです。自分が価値観から外れていると気づく状況や行動のサインは何ですか？"
      onNext={onNext}
      onBack={onBack}
    >
      <TextArea
        label="価値観から外れたサイン（感情・行動・状況）"
        value={data.situations}
        onChange={(v) => onUpdate({ situations: v })}
        placeholder="例：苛立ちやすくなる、言い訳が増える、疲弊感..."
        rows={4}
      />
      <TextArea
        label="気づいたときに軌道修正するための行動"
        value={data.behaviors}
        onChange={(v) => onUpdate({ behaviors: v })}
        placeholder="例：一人で静かに考える時間を作る、信頼できる人に話す..."
        rows={4}
      />
    </StepLayout>
  );
}
