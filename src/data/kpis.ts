import type { Kpi } from '@/types';

export const kpis: Kpi[] = [
  {
    id: 'oee',
    label: 'OEE complessivo',
    value: '73.4',
    unit: '%',
    delta: {
      value: '+4.2 pt',
      direction: 'up',
      semantic: 'positive',
      compare: 'vs. settimana scorsa',
    },
    sparkColor: 'ok',
    sparkSeed: { base: 70, noise: 5, trend: 4 },
  },
  {
    id: 'alerts',
    label: 'Allarmi attivi',
    value: '3',
    delta: {
      value: '2 critici, 1 di attenzione',
      direction: 'down',
      semantic: 'negative',
    },
    sparkColor: 'crit',
    sparkSeed: { base: 4, noise: 1.5, trend: -1 },
  },
  {
    id: 'energy',
    label: 'Energia oggi',
    value: '487',
    unit: 'kWh',
    delta: {
      value: '−6.8%',
      direction: 'down',
      semantic: 'positive',
      compare: 'vs. media settimanale',
    },
    sparkColor: 'ok',
    sparkSeed: { base: 50, noise: 8, trend: -5 },
  },
  {
    id: 'savings',
    label: 'Risparmio cumulato',
    value: '€ 8.420',
    delta: {
      value: 'su base trimestrale',
      direction: 'neutral',
      semantic: 'neutral',
      compare: 'manutenzione + energia',
    },
    sparkColor: 'rust',
    sparkSeed: { base: 5, noise: 1, trend: 8 },
  },
];
