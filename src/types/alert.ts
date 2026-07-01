export type AlertSeverity = 'crit' | 'warn' | 'info';

export type ClaudeModel =
  | 'Claude Haiku 4.5'
  | 'Claude Sonnet 4.6'
  | 'Claude Opus 4.7';

export interface Alert {
  id: string;
  machineId: string;
  machineLabel: string;
  severity: AlertSeverity;
  title: string;
  body: string;
  timestamp: string;
  model: ClaudeModel;
  confidence?: number;
  meta?: string;
}
