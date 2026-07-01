import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import type { Machine, MachineStatus } from '@/types';
import { cn } from '@/lib/cn';
import { Panel } from '@/components/ui/Panel';
import { StatusPill } from '@/components/ui/StatusPill';
import { DetailChart } from './DetailChart';
import { useLiveReadings } from '@/hooks/useLiveReadings';

interface MachineDetailPanelProps {
  machine: Machine;
  animationDelay?: number;
}

const TABS = [
  { id: 'live', label: 'Live' },
  { id: 'vibration', label: 'Vibrazione' },
  { id: 'temperature', label: 'Temperatura' },
  { id: 'cycles', label: 'Cicli & OEE' },
  { id: 'history', label: 'Storico' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export function MachineDetailPanel({
  machine,
  animationDelay,
}: MachineDetailPanelProps) {
  const [tab, setTab] = useState<TabId>('live');
  const readings = useLiveReadings(machine.id);

  return (
    <Panel
      style={{ animationDelay: `${animationDelay ?? 0}ms` }}
      bodyClassName="!overflow-hidden flex flex-col"
    >
      <DetailHeader machine={machine} />
      <TabBar value={tab} onChange={setTab} />
      <DetailChart machine={machine} variant={tab} />
      <MetricsRow
        machineStatus={machine.status}
        current={readings.current}
        vibration={readings.vibration}
        temperature={readings.temperature}
        cyclesPerHour={readings.cyclesPerHour}
      />
    </Panel>
  );
}

function DetailHeader({ machine }: { machine: Machine }) {
  return (
    <header className="flex items-start justify-between border-b border-edge px-5 py-4">
      <div>
        <h2 className="font-serif text-lg font-semibold text-ink-primary">
          {machine.name}
        </h2>
        <dl className="mt-1.5 flex gap-4 text-xs text-ink-secondary">
          <MetaItem label="Stabilimento" value="Varese" />
          <MetaItem label="Reparto" value={machine.department} />
          <MetaItem label="Gateway" value="RT-MOL-001" mono />
        </dl>
      </div>
      <StatusPill status={machine.status} />
    </header>
  );
}

function MetaItem({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="inline">{label} </dt>
      <dd className={cn('inline font-medium text-ink-primary', mono && 'font-mono')}>
        {value}
      </dd>
    </div>
  );
}

function TabBar({
  value,
  onChange,
}: {
  value: TabId;
  onChange: (id: TabId) => void;
}) {
  return (
    <div
      className="flex border-b border-edge px-5"
      role="tablist"
      aria-label="Vista dettaglio macchina"
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={value === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'border-b-2 bg-transparent px-4 py-3 text-[12.5px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-deep',
            value === tab.id
              ? 'border-brand-rust text-brand-deep'
              : 'border-transparent text-ink-secondary hover:text-ink-primary',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

interface MetricsRowProps {
  machineStatus: MachineStatus;
  current: number;
  vibration: number;
  temperature: number;
  cyclesPerHour: number;
}

/**
 * Trend semantics flow from the machine's overall status. A healthy machine
 * should not show alarming arrows. This map keeps the visual signals honest.
 */
function trendsFor(status: MachineStatus) {
  switch (status) {
    case 'crit':
      return {
        current: { dir: 'up' as const, label: '+14.3% baseline' },
        vibration: { dir: 'up' as const, label: 'oltre soglia 4.5' },
        temperature: { dir: 'neutral' as const, label: 'nominale' },
        cycles: { dir: 'down' as const, label: '−3% target' },
      };
    case 'warn':
      return {
        current: { dir: 'up' as const, label: '+8.1% baseline' },
        vibration: { dir: 'up' as const, label: 'soglia 4.5' },
        temperature: { dir: 'neutral' as const, label: 'nominale' },
        cycles: { dir: 'neutral' as const, label: 'in target' },
      };
    case 'ok':
      return {
        current: { dir: 'neutral' as const, label: 'in baseline' },
        vibration: { dir: 'neutral' as const, label: 'sotto soglia' },
        temperature: { dir: 'neutral' as const, label: 'nominale' },
        cycles: { dir: 'neutral' as const, label: 'in target' },
      };
    case 'idle':
      return {
        current: { dir: 'neutral' as const, label: 'macchina ferma' },
        vibration: { dir: 'neutral' as const, label: '—' },
        temperature: { dir: 'neutral' as const, label: 'ambiente' },
        cycles: { dir: 'neutral' as const, label: '—' },
      };
  }
}

function MetricsRow({
  machineStatus,
  current,
  vibration,
  temperature,
  cyclesPerHour,
}: MetricsRowProps) {
  const trends = trendsFor(machineStatus);
  const isIdle = machineStatus === 'idle';
  return (
    <div className="grid grid-cols-4 gap-px border-y border-edge bg-edge">
      <Metric
        label="Corrente assorbita"
        value={isIdle ? '—' : current.toFixed(1)}
        unit="A"
        trend={trends.current.dir}
        trendLabel={trends.current.label}
      />
      <Metric
        label="Vibrazione RMS"
        value={isIdle ? '—' : vibration.toFixed(1)}
        unit="mm/s"
        trend={trends.vibration.dir}
        trendLabel={trends.vibration.label}
      />
      <Metric
        label="Temperatura"
        value={temperature.toString()}
        unit="°C"
        trend={trends.temperature.dir}
        trendLabel={trends.temperature.label}
      />
      <Metric
        label="Cicli / ora"
        value={isIdle ? '—' : cyclesPerHour.toString()}
        unit="cph"
        trend={trends.cycles.dir}
        trendLabel={trends.cycles.label}
      />
    </div>
  );
}

interface MetricProps {
  label: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  trendLabel: string;
}

function Metric({ label, value, unit, trend, trendLabel }: MetricProps) {
  const trendColor =
    trend === 'up'
      ? 'text-status-crit'
      : trend === 'down'
        ? 'text-status-ok'
        : 'text-ink-muted';
  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : null;

  return (
    <div className="bg-bg-card px-4 py-3.5">
      <div className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink-muted">
        {label}
      </div>
      <div className="mt-1.5 font-mono text-lg font-medium leading-tight tracking-tight text-ink-primary tabular">
        {value}
        <span className="ml-0.5 text-[11px] font-normal text-ink-secondary">
          {unit}
        </span>
      </div>
      <div
        className={cn(
          'mt-1 flex items-center gap-1 font-mono text-[11px]',
          trendColor,
        )}
      >
        {TrendIcon && <TrendIcon className="h-3 w-3" />}
        <span>{trendLabel}</span>
      </div>
    </div>
  );
}
