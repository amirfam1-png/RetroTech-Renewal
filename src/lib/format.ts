const MONTHS_IT = [
  'gen',
  'feb',
  'mar',
  'apr',
  'mag',
  'giu',
  'lug',
  'ago',
  'set',
  'ott',
  'nov',
  'dic',
] as const;

export function formatItalianDateTime(date: Date): string {
  const day = date.getDate();
  const month = MONTHS_IT[date.getMonth()];
  const year = date.getFullYear();
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  return `${day} ${month} ${year} · ${hh}:${mm}`;
}

export function formatItalianTime(date: Date): string {
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  const ss = date.getSeconds().toString().padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}
