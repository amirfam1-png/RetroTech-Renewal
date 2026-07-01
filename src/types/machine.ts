export type MachineStatus = 'ok' | 'warn' | 'crit' | 'idle';

export type MachineType =
  | 'Iniezione'
  | 'Fresatura'
  | 'EDM filo'
  | 'EDM tuffo'
  | 'Rettifica';

export interface Machine {
  id: string;
  shortCode: string;
  name: string;
  type: MachineType;
  department: string;
  status: MachineStatus;
  primaryMetric: string;
  primaryMetricSub: string;
}

export interface TelemetryReading {
  hour: string;
  current: number;
  baseline: number;
  threshold: number;
}
