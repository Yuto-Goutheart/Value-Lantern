import type { LanternData } from '../types';
import StepLayout from './StepLayout';
import { TextArea } from './FormField';

interface Props {
  data: LanternData['closing'];
  onUpdate: (d: Partial<LanternData['closing']>) => void;
  onComplete: () => void;
  onBack: () => void;
  allData: LanternData;
}

export default function StepClosing({ data, onUpdate, onComplete, onBack, allData }: Props) {
  return (
    <StepLayout
      step={5}
      icon="🏮"
      title="ステップ 5 — クロージング"
      description="これで自分のキーとなる価値観のアウトラインができました。ワークを振り返り、気づいたことや決意を記録しましょう。"
      onNext={onComplete}
      onBack={onBack}
      nextLabel="ランタンを完成させる ✨"
      data={allData}
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
