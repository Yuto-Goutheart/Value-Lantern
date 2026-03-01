import type { LanternData } from '../types';
import StepLayout from './StepLayout';
import { TextArea } from './FormField';

interface Props {
  data: LanternData['closing'];
  onUpdate: (d: Partial<LanternData['closing']>) => void;
  onComplete: () => void;
  onBack: () => void;
}

export default function StepClosing({ data, onUpdate, onComplete, onBack }: Props) {
  return (
    <StepLayout
      step={5}
      icon="🏮"
      title="ステップ 5 — クロージング"
      description="ワークを振り返り、気づいたことや決意を記録しましょう。"
      onNext={onComplete}
      onBack={onBack}
      nextLabel="結果を見る"
    >
      <TextArea
        label="振り返り・気づき・これからの宣言"
        value={data.reflections}
        onChange={(v) => onUpdate({ reflections: v })}
        placeholder="このワークを通じて気づいたこと、これから大切にしたいことを自由に書いてください..."
        rows={6}
      />
    </StepLayout>
  );
}
