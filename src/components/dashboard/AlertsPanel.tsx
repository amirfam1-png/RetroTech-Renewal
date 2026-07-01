import type { Alert } from '@/types';
import { alerts } from '@/data/alerts';
import { cn } from '@/lib/cn';
import { SEVERITY_BAR } from '@/lib/status';
import { Panel, PanelAction } from '@/components/ui/Panel';
import { AiBadge } from '@/components/ui/AiBadge';
import { InlineMarkdown } from '@/components/ui/InlineMarkdown';

interface AlertsPanelProps {
  animationDelay?: number;
}

export function AlertsPanel({ animationDelay }: AlertsPanelProps) {
  return (
    <Panel
      title="Allarmi & insight AI"
      subtitle="Generati da Claude · Italiano"
      action={<PanelAction>Cronologia</PanelAction>}
      style={{ animationDelay: `${animationDelay ?? 0}ms` }}
    >
      <ul className="m-0 list-none p-0">
        {alerts.map((alert) => (
          <li key={alert.id}>
            <AlertRow alert={alert} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

const SEVERITY_DESCRIPTION = {
  crit: 'critico',
  warn: 'attenzione',
  info: 'informativo',
} as const;

function AlertRow({ alert }: { alert: Alert }) {
  return (
    <button
      type="button"
      aria-label={`Allarme ${SEVERITY_DESCRIPTION[alert.severity]} su ${alert.machineLabel}: ${alert.title}`}
      className="block w-full cursor-pointer border-b border-edge bg-transparent px-[18px] py-3.5 text-left transition last:border-b-0 hover:bg-bg-subtle focus-visible:bg-bg-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-deep"
    >
      <header className="mb-2 flex items-start gap-2.5">
        <div
          className={cn('w-1 self-stretch rounded-sm', SEVERITY_BAR[alert.severity])}
          aria-hidden
        />
        <div className="flex-1">
          <div className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-secondary">
            {alert.machineLabel}
          </div>
          <h3 className="text-[13px] font-medium leading-snug text-ink-primary">
            {alert.title}
          </h3>
        </div>
        <time className="whitespace-nowrap font-mono text-[10.5px] text-ink-muted">
          {alert.timestamp}
        </time>
      </header>

      <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
        <InlineMarkdown text={alert.body} />
      </p>

      <footer className="mt-2 flex items-center gap-1.5 text-[10.5px] text-ink-muted">
        <AiBadge model={alert.model} />
        {alert.confidence !== undefined && (
          <span>· Confidenza {alert.confidence}%</span>
        )}
        {alert.meta && <span>· {alert.meta}</span>}
      </footer>
    </button>
  );
}
