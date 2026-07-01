export type DeltaDirection = 'up' | 'down' | 'neutral';

export interface KpiDelta {
  value: string;
  direction: DeltaDirection;
  /** "positive" means an up arrow is good (e.g. OEE); "negative" means an up arrow is bad (e.g. alerts) */
  semantic: 'positive' | 'negative' | 'neutral';
  compare?: string;
}

export interface Kpi {
  id: string;
  label: string;
  value: string;
  unit?: string;
  delta: KpiDelta;
  sparkColor: 'ok' | 'crit' | 'warn' | 'rust';
  sparkSeed: { base: number; noise: number; trend: number };
}
