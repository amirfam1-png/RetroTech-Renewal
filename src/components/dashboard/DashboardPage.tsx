import { useEffect, useState } from 'react';
import { useSite } from '@/context/SiteContext';
import { PeriodSelector } from '@/components/ui/PeriodSelector';
import { KpiRow } from './KpiRow';
import { MachinesPanel } from './MachinesPanel';
import { MachineDetailPanel } from './MachineDetailPanel';
import { AlertsPanel } from './AlertsPanel';
import { PredictivePanel } from './PredictivePanel';
import { EnergyPanel } from './EnergyPanel';

export function DashboardPage() {
  const { selectedSite } = useSite();
  const [selectedId, setSelectedId] = useState<string>(
    selectedSite.machines[0]?.id ?? '',
  );

  // When the site changes (user switches customer), reset the selected machine
  // to that site's first one. Without this the previous site's ID would persist
  // and the detail panel would fall back to the empty state.
  useEffect(() => {
    const firstId = selectedSite.machines[0]?.id;
    if (firstId) setSelectedId(firstId);
  }, [selectedSite.id, selectedSite.machines]);

  const selected =
    selectedSite.machines.find((m) => m.id === selectedId) ??
    selectedSite.machines[0];

  if (!selected) {
    return <EmptyState />;
  }

  return (
    <>
      <PageHeader machineCount={selectedSite.machines.length} />
      <KpiRow />

      <section
        className="mb-6 grid gap-4"
        style={{ gridTemplateColumns: '320px 1fr 320px' }}
      >
        <MachinesPanel
          machines={selectedSite.machines}
          selectedId={selected.id}
          onSelect={setSelectedId}
          animationDelay={300}
        />
        <MachineDetailPanel machine={selected} animationDelay={360} />
        <AlertsPanel animationDelay={420} />
      </section>

      <section
        className="grid gap-4"
        style={{ gridTemplateColumns: '1.4fr 1fr' }}
      >
        <PredictivePanel animationDelay={480} />
        <EnergyPanel animationDelay={540} />
      </section>
    </>
  );
}

function EmptyState() {
  return (
    <div className="grid h-full place-items-center text-ink-secondary">
      <div className="text-center">
        <h2 className="font-serif text-lg font-semibold text-ink-primary">
          Nessuna macchina connessa
        </h2>
        <p className="mt-2 text-sm">
          Verifica la connessione del gateway o aggiungi una macchina al sito.
        </p>
      </div>
    </div>
  );
}

function PageHeader({ machineCount }: { machineCount: number }) {
  return (
    <header className="mb-6 flex animate-fade-up items-end justify-between">
      <div>
        <h1 className="font-serif text-[26px] font-semibold leading-tight tracking-tight text-ink-primary">
          Dashboard operativa
        </h1>
        <p className="mt-1 text-[13px] text-ink-secondary">
          Panoramica in tempo reale · {machineCount} macchine connesse · Turno
          mattutino in corso
        </p>
      </div>
      <PeriodSelector />
    </header>
  );
}
