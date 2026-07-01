import { Activity, AlertTriangle, Zap, Euro } from 'lucide-react';
import { KpiCard } from '@/components/ui/KpiCard';
import { kpis } from '@/data/kpis';

const ICONS = {
  oee: Activity,
  alerts: AlertTriangle,
  energy: Zap,
  savings: Euro,
} as const;

export function KpiRow() {
  return (
    <section
      className="mb-6 grid gap-4"
      style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
    >
      {kpis.map((kpi, index) => (
        <KpiCard
          key={kpi.id}
          kpi={kpi}
          icon={ICONS[kpi.id as keyof typeof ICONS]}
          animationDelay={60 + index * 60}
        />
      ))}
    </section>
  );
}
