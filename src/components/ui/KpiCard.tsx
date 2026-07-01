import { ArrowUp, ArrowDown, Minus, type LucideIcon } from 'lucide-react';
import type { Kpi } from '@/types';
import { cn } from '@/lib/cn';
import { Sparkline } from './Sparkline';

const SPARK_COLORS = {
  ok: '#5a8f5a',
  crit: '#b33a3a',
  warn: '#d08c2d',
  rust: '#c97a40',
} as const;

interface KpiCardProps {
  kpi: Kpi;
  icon?: LucideIcon;
  animationDelay?: number;
}

export function KpiCard({ kpi, icon: Icon, animationDelay = 0 }: KpiCardProps) {
  const deltaColor =
    kpi.delta.semantic === 'positive'
      ? 'text-status-ok'
      : kpi.delta.semantic === 'negative'
        ? 'text-status-crit'
        : 'text-ink-secondary';

  const DeltaIcon =
    kpi.delta.direction === 'up'
      ? ArrowUp
      : kpi.delta.direction === 'down'
        ? ArrowDown
        : Minus;

  return (
    <article
      className="relative animate-fade-up overflow-hidden rounded-lg border border-edge bg-bg-card px-5 py-[18px] transition hover:-translate-y-px hover:shadow-card"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
        {Icon && <Icon className="h-3.5 w-3.5 text-brand-deep opacity-70" />}
        <span>{kpi.label}</span>
      </div>

      <div className="my-2.5 font-serif text-[32px] font-semibold leading-none tracking-tight text-ink-primary">
        {kpi.value}
        {kpi.unit && (
          <span className="ml-1 font-sans text-sm font-normal text-ink-secondary">
            {kpi.unit}
          </span>
        )}
      </div>

      <div
        className={cn(
          'flex items-center gap-1 font-mono text-xs',
          deltaColor,
        )}
      >
        <DeltaIcon className="h-3 w-3" />
        <span>{kpi.delta.value}</span>
        {kpi.delta.compare && (
          <span className="ml-1.5 font-sans text-[11px] text-ink-muted">
            {kpi.delta.compare}
          </span>
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-10 w-20 opacity-[0.18]"
      >
        <Sparkline
          base={kpi.sparkSeed.base}
          noise={kpi.sparkSeed.noise}
          trend={kpi.sparkSeed.trend}
          color={SPARK_COLORS[kpi.sparkColor]}
        />
      </div>
    </article>
  );
}
