import type { Prediction } from '@/types';
import { predictions } from '@/data/predictions';
import { cn } from '@/lib/cn';
import { Panel, PanelAction } from '@/components/ui/Panel';

const SEVERITY_FILL: Record<Prediction['severity'], string> = {
  ok: 'bg-status-ok',
  warn: 'bg-status-warn',
  crit: 'bg-status-crit',
};

export function PredictivePanel({
  animationDelay,
}: {
  animationDelay?: number;
}) {
  return (
    <Panel
      title="Manutenzione predittiva — orizzonte 30 giorni"
      subtitle="Modello Vertex AI · ultima ri-formazione 12 mag"
      action={<PanelAction>Pianifica interventi</PanelAction>}
      style={{ animationDelay: `${animationDelay ?? 0}ms` }}
    >
      <div className="py-1">
        {predictions.map((prediction) => (
          <PredictionRow key={prediction.machineId} prediction={prediction} />
        ))}
      </div>
    </Panel>
  );
}

function PredictionRow({ prediction }: { prediction: Prediction }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3.5 border-b border-edge px-[18px] py-3 last:border-b-0 hover:bg-bg-subtle">
      <div className="grid h-9 w-9 place-items-center rounded-md bg-bg-subtle font-mono text-[11px] font-semibold text-brand-deep">
        {prediction.shortCode}
      </div>

      <div className="min-w-0">
        <div className="text-[13px] font-medium text-ink-primary">
          {prediction.machineName}
        </div>
        <div className="mt-0.5 text-[11.5px] text-ink-secondary">
          {prediction.fault}
        </div>
      </div>

      <div className="flex w-28 flex-col items-end">
        <div className="mb-1 h-1.5 w-28 overflow-hidden rounded-sm bg-edge">
          <div
            className={cn(
              'h-full rounded-sm transition-[width] duration-700 ease-out',
              SEVERITY_FILL[prediction.severity],
            )}
            style={{ width: `${prediction.confidence}%` }}
          />
        </div>
        <span className="font-mono text-[11px] text-ink-secondary">
          {prediction.confidence}% confidenza
        </span>
      </div>

      <div className="min-w-[70px] text-right">
        <div className="font-mono text-xs font-medium text-ink-primary">
          {prediction.etaDays} g
        </div>
        <div className="mt-px text-[10px] text-ink-muted">stimato</div>
      </div>
    </div>
  );
}
