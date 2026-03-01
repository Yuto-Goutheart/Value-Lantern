import type { LanternData } from '../types';
import StepLayout from './StepLayout';
import { TextArea } from './FormField';

interface Props {
  data: LanternData['handle'];
  onUpdate: (d: Partial<LanternData['handle']>) => void;
  onNext: () => void;
  onBack: () => void;
  allData: LanternData;
}

const INSTRUCTION = `> 時に人生は難しいものです。そんな時、私たちはついランタンを手放してしまい、その存在を忘れてしまいます。あまりにも困難に気を取られて、価値観から目がそれてしまうのです。このような状況においては、誰もが手近なやすらぎに飛びついてしまい、自分にとって大事なことを忘れてしまうのが普通でしょう。
>
> 私たちがランタンを手放してしまうのは、それが一時的に重くなったように感じてしまうからです。しかし、ランタンなしでは私たちの周囲は闇に包まれたままであり、再びハンドルを握り直す必要があります。`;

export default function StepHandle({ data, onUpdate, onNext, onBack, allData }: Props) {
  return (
    <StepLayout
      step={3}
      icon="🤚"
      title="ステップ 3 — ハンドル（取っ手）"
      description="取っ手はランタンを持ち運ぶ手がかりです。自分が価値観から外れていると気づく状況や行動のサインは何ですか？"
      instruction={INSTRUCTION}
      onNext={onNext}
      onBack={onBack}
      data={allData}
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
