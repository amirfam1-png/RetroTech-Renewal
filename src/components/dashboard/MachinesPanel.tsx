import type { Machine } from '@/types';
import { cn } from '@/lib/cn';
import { Panel, PanelAction } from '@/components/ui/Panel';
import { StatusDot } from '@/components/ui/StatusDot';

interface MachinesPanelProps {
  machines: Machine[];
  selectedId: string;
  onSelect: (machineId: string) => void;
  animationDelay?: number;
}

export function MachinesPanel({
  machines,
  selectedId,
  onSelect,
  animationDelay,
}: MachinesPanelProps) {
  const counts = countByStatus(machines);
  const activeCount = counts.ok + counts.warn + counts.crit;

  return (
    <Panel
      title="Parco macchine"
      subtitle={`${machines.length} connesse · ${activeCount} attive`}
      action={<PanelAction>Tutte →</PanelAction>}
      style={{ animationDelay: `${animationDelay ?? 0}ms` }}
      bodyClassName="!overflow-hidden flex flex-col"
    >
      <div className="flex-1 overflow-y-auto p-2">
        {machines.map((machine) => (
          <MachineRow
            key={machine.id}
            machine={machine}
            isSelected={machine.id === selectedId}
            onClick={() => onSelect(machine.id)}
          />
        ))}
      </div>
      <SummaryFooter counts={counts} />
    </Panel>
  );
}

function MachineRow({
  machine,
  isSelected,
  onClick,
}: {
  machine: Machine;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'mb-0.5 grid w-full grid-cols-[auto_1fr_auto] items-center gap-2.5 rounded-md border border-transparent px-3 py-2.5 text-left transition',
        isSelected
          ? 'border-brand-deep bg-bg-subtle'
          : 'hover:bg-bg-subtle',
      )}
    >
      <StatusDot status={machine.status} />
      <div className="min-w-0">
        <div className="truncate text-[12.5px] font-medium text-ink-primary">
          {machine.name}
        </div>
        <div className="mt-px text-[11px] text-ink-muted">{machine.type}</div>
      </div>
      <div className="text-right">
        <div className="font-mono text-[11.5px] font-medium text-ink-secondary">
          {machine.primaryMetric}
        </div>
        <div className="mt-px text-[10px] text-ink-muted">
          {machine.primaryMetricSub}
        </div>
      </div>
    </button>
  );
}

type StatusCounts = Record<'ok' | 'warn' | 'crit' | 'idle', number>;

function countByStatus(list: Machine[]): StatusCounts {
  return list.reduce<StatusCounts>(
    (acc, m) => {
      acc[m.status] += 1;
      return acc;
    },
    { ok: 0, warn: 0, crit: 0, idle: 0 },
  );
}

function SummaryFooter({ counts }: { counts: StatusCounts }) {
  return (
    <div className="flex justify-around border-t border-edge bg-bg-subtle px-[18px] py-3 text-[11px]">
      <Cell label="OK" value={counts.ok} color="text-status-ok" />
      <Cell label="Attenzione" value={counts.warn} color="text-status-warn" />
      <Cell label="Critico" value={counts.crit} color="text-status-crit" />
      <Cell label="Fermo" value={counts.idle} color="text-status-idle" />
    </div>
  );
}

function Cell({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="text-center">
      <span className={cn('block font-mono text-base font-semibold', color)}>
        {value}
      </span>
      <span className="mt-px block text-[9.5px] uppercase tracking-[0.06em] text-ink-muted">
        {label}
      </span>
    </div>
  );
}
