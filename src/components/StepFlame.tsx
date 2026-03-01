import type { LanternData } from '../types';
import StepLayout from './StepLayout';
import { TextInput, TextArea } from './FormField';

interface Props {
  data: LanternData['flame'];
  onUpdate: (d: Partial<LanternData['flame']>) => void;
  onNext: () => void;
}

export default function StepFlame({ data, onUpdate, onNext }: Props) {
  const canProceed = data.value1.trim().length > 0 && data.value2.trim().length > 0;

  return (
    <StepLayout
      step={1}
      icon="🔥"
      title="ステップ 1 — 炎"
      description="あなたの人生で最も重要な価値観を 2 つ選んでください。これがランタンの炎 — あなたの核心的なエネルギー源です。"
      onNext={onNext}
      nextDisabled={!canProceed}
    >
      <TextInput
        label="価値観 1"
        value={data.value1}
        onChange={(v) => onUpdate({ value1: v })}
        placeholder="例：誠実さ、自由、家族..."
        maxLength={50}
      />
      <TextArea
        label="この価値観があなたにとって重要な理由"
        value={data.value1Desc ?? ''}
        onChange={(v) => onUpdate({ value1Desc: v })}
        placeholder="なぜこの価値観が大切ですか？"
      />
      <TextInput
        label="価値観 2"
        value={data.value2}
        onChange={(v) => onUpdate({ value2: v })}
        placeholder="例：勇気、創造性、思いやり..."
        maxLength={50}
      />
      <TextArea
        label="この価値観があなたにとって重要な理由"
        value={data.value2Desc ?? ''}
        onChange={(v) => onUpdate({ value2Desc: v })}
        placeholder="なぜこの価値観が大切ですか？"
      />
    </StepLayout>
  );
}
