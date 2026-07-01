import { useState } from 'react';
import { cn } from '@/lib/cn';

export type Period = '1h' | '24h' | '7d' | '30d';

const PERIODS: { id: Period; label: string }[] = [
  { id: '1h', label: '1 ora' },
  { id: '24h', label: '24 ore' },
  { id: '7d', label: '7 giorni' },
  { id: '30d', label: '30 giorni' },
];

interface PeriodSelectorProps {
  defaultPeriod?: Period;
  onChange?: (period: Period) => void;
}

export function PeriodSelector({
  defaultPeriod = '24h',
  onChange,
}: PeriodSelectorProps) {
  const [value, setValue] = useState<Period>(defaultPeriod);

  const handleSelect = (period: Period) => {
    setValue(period);
    onChange?.(period);
  };

  return (
    <div className="flex overflow-hidden rounded-md border border-edge bg-bg-card">
      {PERIODS.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => handleSelect(p.id)}
          className={cn(
            'border-0 px-3.5 py-[7px] text-[12.5px] transition',
            value === p.id
              ? 'bg-bg-dark font-medium text-ink-inverse'
              : 'bg-transparent text-ink-secondary hover:text-ink-primary',
          )}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
