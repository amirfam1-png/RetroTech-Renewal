import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Check, Download, Loader2 } from 'lucide-react';
import { Panel } from '@/components/ui/Panel';
import { useSite } from '@/context/SiteContext';
import type { Site } from '@/types';

const DATA = [
  { hour: '06', today: 42, baseline: 48 },
  { hour: '08', today: 78, baseline: 84 },
  { hour: '10', today: 92, baseline: 96 },
  { hour: '12', today: 88, baseline: 95 },
  { hour: '14', today: 79, baseline: 86 },
  { hour: '16', today: 62, baseline: 70 },
  { hour: '18', today: 46, baseline: 51 },
];

const TICK_STYLE = { fontSize: 10, fill: '#5c6670' } as const;

export function EnergyPanel({ animationDelay }: { animationDelay?: number }) {
  const { selectedSite } = useSite();

  return (
    <Panel
      title="Energia & sostenibilità"
      subtitle={`Sito ${selectedSite.city} · oggi`}
      action={<ReportButton site={selectedSite} />}
      style={{ animationDelay: `${animationDelay ?? 0}ms` }}
      bodyClassName="!overflow-hidden"
    >
      <div className="px-5 pt-4">
        <header className="mb-3.5 flex items-baseline justify-between">
          <div className="font-serif text-[28px] font-semibold leading-none tracking-tight text-ink-primary">
            487
            <span className="ml-1 font-sans text-[13px] font-normal text-ink-secondary">
              kWh
            </span>
          </div>
          <div className="rounded-full bg-status-ok-bg px-2.5 py-1 font-mono text-[11.5px] font-medium text-status-ok">
            −6.8% vs media
          </div>
        </header>

        <div className="h-[110px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={DATA}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <CartesianGrid stroke="rgba(26,37,48,0.06)" vertical={false} />
              <XAxis
                dataKey="hour"
                axisLine={false}
                tickLine={false}
                tick={TICK_STYLE}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={TICK_STYLE}
                tickFormatter={(v) => `${v} kWh`}
                width={56}
              />
              <Tooltip
                cursor={{ fill: 'rgba(26,37,48,0.04)' }}
                contentStyle={{
                  background: '#1a2530',
                  border: 0,
                  borderRadius: 4,
                  color: '#fff',
                  fontSize: 11,
                  padding: 8,
                }}
                itemStyle={{ fontFamily: "'IBM Plex Mono', monospace" }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="square"
                iconSize={9}
                wrapperStyle={{ fontSize: 10, paddingTop: 4 }}
              />
              <Bar
                dataKey="baseline"
                name="Media settimanale"
                fill="rgba(140,140,140,0.18)"
                radius={[3, 3, 0, 0]}
                isAnimationActive={false}
              />
              <Bar
                dataKey="today"
                name="Oggi"
                fill="#1b4a5a"
                radius={[3, 3, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <footer className="grid grid-cols-2 gap-4 border-t border-edge px-5 py-3.5">
        <Stat label="CO₂ evitato (mese)" value="1.42" unit="t" />
        <div>
          <Stat label="Risparmio processo" value="5.8" unit="%" />
          <ComplianceTag />
        </div>
      </footer>
    </Panel>
  );
}

/**
 * Lazy-loads @react-pdf/renderer only on click. This keeps the heavy PDF
 * library out of the main dashboard bundle — the user pays the load cost
 * only if they actually generate a report.
 */
function ReportButton({ site }: { site: Site }) {
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const [pdfModule, reportModule] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/components/pdf/IperammortamentoReport'),
      ]);
      const blob = await pdfModule
        .pdf(<reportModule.IperammortamentoReport site={site} />)
        .toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeName = site.shortName.replace(/\s+/g, '_');
      a.download = `Iperammortamento_${safeName}_Q2_2026.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      // In a real app this would surface a toast — in the demo we just log.
      console.error('Failed to generate report:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={generating}
      className="flex items-center gap-1.5 bg-transparent text-xs font-medium text-brand-deep transition hover:text-brand-rust disabled:opacity-60"
    >
      {generating ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Generazione…
        </>
      ) : (
        <>
          <Download className="h-3.5 w-3.5" />
          Genera report Iperammortamento
        </>
      )}
    </button>
  );
}

function Stat({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div>
      <div className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink-muted">
        {label}
      </div>
      <div className="mt-1 font-mono text-base font-medium text-ink-primary tabular">
        {value}
        <span className="ml-0.5 text-[11px] font-normal text-ink-secondary">
          {unit}
        </span>
      </div>
    </div>
  );
}

function ComplianceTag() {
  return (
    <span className="mt-2 inline-flex items-center gap-1.5 rounded bg-brand-deep px-2 py-0.5 text-[10px] font-medium tracking-wide text-ink-inverse">
      <Check className="h-3 w-3" />
      Soglia Iperammortamento 2026
    </span>
  );
}
