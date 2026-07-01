import type { MachineStatus } from '@/types';
import { cn } from '@/lib/cn';
import { STATUS_LABEL, STATUS_PILL_BG } from '@/lib/status';

interface StatusPillProps {
  status: MachineStatus;
  label?: string;
}

export function StatusPill({ status, label }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em]',
        STATUS_PILL_BG[status],
      )}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: 'currentColor' }}
      />
      {label ?? STATUS_LABEL[status]}
    </span>
  );
}
