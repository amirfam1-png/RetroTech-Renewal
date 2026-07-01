import {
  LayoutGrid,
  Settings,
  Timer,
  AlertTriangle,
  Zap,
  Wrench,
  TrendingUp,
  Leaf,
  FileText,
  Euro,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { formatItalianTime } from '@/lib/format';
import { useLiveClock } from '@/hooks/useLiveClock';
import { useSite } from '@/context/SiteContext';

interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Operazioni',
    items: [
      { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
      { id: 'machines', icon: Settings, label: 'Macchine' },
      { id: 'production', icon: Timer, label: 'Produzione' },
      { id: 'alarms', icon: AlertTriangle, label: 'Allarmi', badge: 3 },
    ],
  },
  {
    label: 'Analisi',
    items: [
      { id: 'energy', icon: Zap, label: 'Energia' },
      { id: 'maintenance', icon: Wrench, label: 'Manutenzione' },
      { id: 'oee', icon: TrendingUp, label: 'OEE & KPI' },
    ],
  },
  {
    label: 'Conformità',
    items: [
      { id: 'sustainability', icon: Leaf, label: 'Sostenibilità' },
      { id: 'reports', icon: FileText, label: 'Report' },
      { id: 'incentives', icon: Euro, label: 'Iperammortamento' },
    ],
  },
];

export function Sidebar() {
  const [active, setActive] = useState<string>('dashboard');
  const now = useLiveClock(1_000);
  const { selectedSite } = useSite();

  return (
    <aside className="flex flex-col overflow-y-auto border-r border-edge bg-bg-card py-5">
      {NAV_GROUPS.map((group) => (
        <NavSection key={group.label} group={group} active={active} onSelect={setActive} />
      ))}
      <SidebarFooter
        syncTime={formatItalianTime(now)}
        gatewayId={selectedSite.gatewayId}
      />
    </aside>
  );
}

function NavSection({
  group,
  active,
  onSelect,
}: {
  group: NavGroup;
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mb-3 px-3">
      <div className="px-3 pb-1 pt-2 text-[10px] font-medium uppercase tracking-[0.1em] text-ink-muted">
        {group.label}
      </div>
      {group.items.map((item) => (
        <NavRow
          key={item.id}
          item={item}
          isActive={item.id === active}
          onClick={() => onSelect(item.id)}
        />
      ))}
    </div>
  );
}

function NavRow({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'mb-0.5 flex w-full items-center gap-3 rounded-md px-3 py-2 text-[13.5px] font-normal transition-colors',
        isActive
          ? 'bg-brand-deep font-medium text-ink-inverse'
          : 'text-ink-secondary hover:bg-bg-subtle hover:text-ink-primary',
      )}
    >
      <Icon
        className={cn(
          'h-[18px] w-[18px]',
          isActive ? 'text-brand-rust-soft' : 'text-ink-muted',
        )}
      />
      <span className="flex-1 text-left">{item.label}</span>
      {item.badge !== undefined && (
        <span className="ml-auto rounded-full bg-status-crit px-1.5 py-px text-[10px] font-semibold text-white">
          {item.badge}
        </span>
      )}
    </button>
  );
}

function SidebarFooter({
  syncTime,
  gatewayId,
}: {
  syncTime: string;
  gatewayId: string;
}) {
  return (
    <div className="mt-auto border-t border-edge px-6 py-4 text-[11px] leading-relaxed text-ink-muted">
      <strong className="font-semibold text-ink-secondary">
        RetroTech Renewal v1.0
      </strong>
      <br />
      Gateway: <span className="font-mono">{gatewayId}</span>
      <br />
      Ultima sincronizzazione: <span className="font-mono">{syncTime}</span>
    </div>
  );
}
