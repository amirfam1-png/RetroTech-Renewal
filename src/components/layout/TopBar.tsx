import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Check } from 'lucide-react';
import { useLiveClock } from '@/hooks/useLiveClock';
import { formatItalianDateTime } from '@/lib/format';
import { useSite } from '@/context/SiteContext';
import { cn } from '@/lib/cn';

export function TopBar() {
  const now = useLiveClock();
  const { selectedSite, sites, selectSite } = useSite();

  return (
    <header className="col-span-full flex h-16 items-center gap-6 border-b border-[#0e1820] bg-bg-dark px-6 text-ink-inverse">
      <Brand />
      <SiteSelector
        siteLabel={`${selectedSite.name} — ${selectedSite.city}`}
        sites={sites}
        selectedId={selectedSite.id}
        onSelect={selectSite}
      />
      <div className="ml-auto flex items-center gap-5">
        <LivePill />
        <time
          className="font-mono text-xs text-white/60"
          dateTime={now.toISOString()}
        >
          {formatItalianDateTime(now)}
        </time>
        <UserBlock />
      </div>
    </header>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3 font-serif text-base font-semibold tracking-tight">
      <div className="grid h-7 w-7 place-items-center rounded bg-brand-rust font-mono text-sm font-bold text-bg-dark">
        R
      </div>
      <div>
        Retro<span className="text-brand-rust">Tech</span> Renewal
      </div>
    </div>
  );
}

function SiteSelector({
  siteLabel,
  sites,
  selectedId,
  onSelect,
}: {
  siteLabel: string;
  sites: ReturnType<typeof useSite>['sites'];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative ml-2" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2.5 rounded-md border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[13px] transition hover:bg-white/[0.08]"
      >
        <span className="text-[11px] uppercase tracking-[0.08em] text-white/50">
          Sito
        </span>
        <span>{siteLabel}</span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-white/40 transition',
            open && 'rotate-180',
          )}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-50 mt-1.5 min-w-[320px] overflow-hidden rounded-md border border-white/10 bg-bg-dark shadow-card-lg"
        >
          {sites.map((site) => (
            <li key={site.id}>
              <button
                type="button"
                role="option"
                aria-selected={site.id === selectedId}
                onClick={() => {
                  onSelect(site.id);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-left text-[13px] transition last:border-b-0 hover:bg-white/[0.06]',
                  site.id === selectedId && 'bg-white/[0.06]',
                )}
              >
                <div className="flex-1">
                  <div className="font-medium text-white">{site.name}</div>
                  <div className="mt-0.5 text-[11px] text-white/55">
                    {site.city} · {site.industry} · {site.machines.length} macchine
                  </div>
                </div>
                {site.id === selectedId && (
                  <Check className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-brand-rust" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LivePill() {
  return (
    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-white/70">
      <span className="block h-2 w-2 animate-pulse-live rounded-full bg-[#5fc46a]" />
      <span>Telemetria live</span>
    </div>
  );
}

function UserBlock() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center gap-2.5 border-l border-white/10 pl-4 transition hover:opacity-80"
      >
        <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-rust text-xs font-semibold text-bg-dark">
          VM
        </div>
        <div className="text-left leading-tight">
          <div className="text-[13px] font-medium">Valerio Molina</div>
          <div className="text-[11px] text-white/50">Amministratore</div>
        </div>
      </button>
      {menuOpen && (
        <ul className="absolute right-0 top-full z-50 mt-1.5 min-w-[180px] overflow-hidden rounded-md border border-white/10 bg-bg-dark shadow-card-lg">
          <li>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] text-white transition hover:bg-white/[0.06]"
            >
              <LogOut className="h-3.5 w-3.5" />
              Esci dalla demo
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
