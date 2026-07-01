import type { MachineStatus } from './machine';

export interface Prediction {
  machineId: string;
  shortCode: string;
  machineName: string;
  fault: string;
  severity: Exclude<MachineStatus, 'idle'>;
  confidence: number;
  etaDays: number;
}
