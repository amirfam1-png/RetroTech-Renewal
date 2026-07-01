import type { Alert } from '@/types';

export const alerts: Alert[] = [
  {
    id: 'alert-1',
    machineId: 'HRB-100-2',
    machineLabel: 'Pressa Harburg 100T #2',
    severity: 'crit',
    title: 'Probabile usura cuscinetto principale',
    body:
      "Aumento del **14.3%** nell'assorbimento di corrente negli ultimi 4 turni, vibrazione RMS sopra soglia. Pattern coerente con usura del cuscinetto principale.\n\n**Azione consigliata:** intervento entro 72 ore. Tecnico stimato: €240. Costo del ritardo: ~€8.500 in caso di fermo non pianificato.",
    timestamp: '14:22',
    model: 'Claude Sonnet 4.6',
    confidence: 87,
    meta: 'Modello PdM treno epoche 142',
  },
  {
    id: 'alert-2',
    machineId: 'GF-HSC-1',
    machineLabel: 'Centro CNC GF #1',
    severity: 'warn',
    title: 'Temperatura mandrino oltre soglia',
    body:
      'Mandrino ad alta velocità a **74°C** (soglia 70°C). Verifica del sistema di raffreddamento raccomandata prima del prossimo lotto di precisione.',
    timestamp: '13:51',
    model: 'Claude Haiku 4.5',
    confidence: 92,
  },
  {
    id: 'alert-3',
    machineId: 'FAN-EDM',
    machineLabel: 'Elettroerosione Fanuc',
    severity: 'warn',
    title: 'Consumo elettrodo anomalo',
    body:
      'Consumo filo del **+22%** rispetto al riferimento per il programma corrente. Possibile errore di parametrizzazione o problema di tensione filo.',
    timestamp: '11:08',
    model: 'Claude Haiku 4.5',
    confidence: 78,
  },
  {
    id: 'alert-4',
    machineId: 'SYSTEM',
    machineLabel: 'Sistema',
    severity: 'info',
    title: 'Report Iperammortamento Q2 pronto',
    body:
      'Riduzione energetica documentata: **5.8%** a livello di processo (soglia minima 5%). Il sito è qualificato per la maxi-deduzione.',
    timestamp: '09:00',
    model: 'Claude Opus 4.7',
    meta: 'Documento di 14 pagine generato',
  },
];
