import type { LanternData } from '../types';
import StepLayout from './StepLayout';
import { TextArea } from './FormField';

interface Props {
  data: LanternData['protection'];
  onUpdate: (d: Partial<LanternData['protection']>) => void;
  onNext: () => void;
  onBack: () => void;
  allData: LanternData;
}

export default function StepProtection({ data, onUpdate, onNext, onBack, allData }: Props) {
  return (
    <StepLayout
      step={2}
      icon="🪟"
      title="ステップ 2 — プロテクション（ガラス）"
      description="ガラスは炎を守ります。あなたの価値観を守る行動や習慣、そしてサポートしてくれる大切な人は誰・何ですか？"
      onNext={onNext}
      onBack={onBack}
      data={allData}
    >
      <TextArea
        label="価値観を守る行動・習慣"
        value={data.actions}
        onChange={(v) => onUpdate({ actions: v })}
        placeholder="例：毎朝の内省の時間、断る勇気を持つこと..."
        rows={4}
      />
      <TextArea
        label="あなたをサポートしてくれる人物・コミュニティ"
        value={data.supporters}
        onChange={(v) => onUpdate({ supporters: v })}
        placeholder="例：信頼できる友人の名前、家族、メンター..."
        rows={4}
      />
    </StepLayout>
  );
}
