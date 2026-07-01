import type { Machine, TelemetryReading } from '@/types';

interface Spike {
  start: number;
  end: number;
  amount: number;
}

/**
 * Deterministic-ish synthetic time-series for the prototype.
 * Replace this module with a real telemetry client (WebSocket / SSE feed from
 * the gateway) when wiring up the real backend.
 */
function generateValues(
  n: number,
  base: number,
  noise: number,
  trend = 0,
  spike?: Spike,
): number[] {
  const data: number[] = [];
  for (let i = 0; i < n; i++) {
    let v = base + trend * (i / n) + (Math.random() - 0.5) * noise;
    if (spike && i >= spike.start && i <= spike.end) {
      const phase =
        (i - spike.start) / Math.max(1, spike.end - spike.start);
      v += spike.amount * Math.sin(phase * Math.PI);
    }
    data.push(Math.max(0, v));
  }
  return data;
}

function hourLabels(n: number): string[] {
  const now = new Date();
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(now.getTime() - (n - i - 1) * 3600_000);
    return d.getHours().toString().padStart(2, '0') + ':00';
  });
}

export function buildTelemetry(machine: Machine, hours = 24): TelemetryReading[] {
  const trouble = machine.status === 'crit' || machine.status === 'warn';
  const labels = hourLabels(hours);
  const current = generateValues(
    hours,
    32,
    2.5,
    trouble ? 6 : 0,
    trouble ? { start: 16, end: 23, amount: 4 } : undefined,
  );
  const BASELINE = 33.4;
  const THRESHOLD = 38;
  return labels.map((hour, i) => ({
    hour,
    current: Number((current[i] ?? BASELINE).toFixed(2)),
    baseline: BASELINE,
    threshold: THRESHOLD,
  }));
}

export function generateSparkline(
  base: number,
  noise: number,
  trend: number,
  points = 20,
): number[] {
  return generateValues(points, base, noise, trend);
}
