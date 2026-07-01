import type { AlertSeverity, MachineStatus } from '@/types';

/** Tailwind color tokens for each machine status — used in dots, pills, bars. */
export const STATUS_COLOR: Record<MachineStatus, string> = {
  ok: 'bg-status-ok',
  warn: 'bg-status-warn',
  crit: 'bg-status-crit',
  idle: 'bg-status-idle',
};

export const STATUS_PILL_BG: Record<MachineStatus, string> = {
  ok: 'bg-status-ok-bg text-status-ok',
  warn: 'bg-status-warn-bg text-status-warn',
  crit: 'bg-status-crit-bg text-status-crit',
  idle: 'bg-status-idle-bg text-status-idle',
};

export const STATUS_LABEL: Record<MachineStatus, string> = {
  ok: 'In funzione',
  warn: 'Attenzione',
  crit: 'Critico',
  idle: 'In attesa',
};

export const STATUS_PULSE: Record<MachineStatus, string> = {
  ok: '',
  warn: 'animate-pulse-warn',
  crit: 'animate-pulse-crit',
  idle: '',
};

export const SEVERITY_BAR: Record<AlertSeverity, string> = {
  crit: 'bg-status-crit',
  warn: 'bg-status-warn',
  info: 'bg-brand-deep',
};
