import type { LanternData } from '../types';
import StepLayout from './StepLayout';
import { TextInput, TextArea } from './FormField';

interface Props {
  data: LanternData['flame'];
  onUpdate: (d: Partial<LanternData['flame']>) => void;
  onNext: () => void;
  allData: LanternData;
}

const INSTRUCTION = `> 人生に確実な保証はありません。人生では必ず困難に出会い、さらに失敗を犯します。時に、暗闇が我々を包むでしょう。しかし、もし私たちが内なる光を見つけていれば、私たちは常に光を再び見つけることができるはずです。
>
> このエクササイズでは、あなたは自分の内なる光を探して行きます。`;

export default function StepFlame({ data, onUpdate, onNext, allData }: Props) {
  const canProceed = data.value1.trim().length > 0 && data.value2.trim().length > 0;

  return (
    <StepLayout
      step={1}
      icon="🔥"
      title="ステップ 1 — 炎"
      description="もし人生でもっとも重要なものを２つだけ選ぶとしたら、それは何でしょうか？　あなたの核心的なエネルギー源を見つけましょう。"
      instruction={INSTRUCTION}
      onNext={onNext}
      nextDisabled={!canProceed}
      data={allData}
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
