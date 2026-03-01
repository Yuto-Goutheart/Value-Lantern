export interface LanternData {
  // ステップ1: 炎 - コアとなる価値観
  flame: {
    value1: string;
    value2: string;
    value1Desc?: string;
    value2Desc?: string;
  };
  // ステップ2: プロテクション - 価値観を守るもの
  protection: {
    actions: string;
    supporters: string;
  };
  // ステップ3: ハンドル - 価値観から離れる時
  handle: {
    situations: string;
    behaviors: string;
  };
  // ステップ4: ライト - 価値観に沿って行動できた時
  light: {
    situations: string;
    outcomes: string;
    feelings: string;
  };
  // ステップ5: クロージング - まとめ
  closing: {
    reflections: string;
  };
}

export type Step = 1 | 2 | 3 | 4 | 5;
