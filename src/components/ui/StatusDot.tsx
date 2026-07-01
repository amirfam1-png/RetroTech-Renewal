import type { MachineStatus } from '@/types';
import { cn } from '@/lib/cn';
import { STATUS_COLOR, STATUS_PULSE } from '@/lib/status';

interface StatusDotProps {
  status: MachineStatus;
  size?: 'sm' | 'md';
}

const SIZE_MAP = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
} as const;

export function StatusDot({ status, size = 'md' }: StatusDotProps) {
  return (
    <span
      role="presentation"
      className={cn(
        'block flex-shrink-0 rounded-full',
        SIZE_MAP[size],
        STATUS_COLOR[status],
        STATUS_PULSE[status],
      )}
    />
  );
}
