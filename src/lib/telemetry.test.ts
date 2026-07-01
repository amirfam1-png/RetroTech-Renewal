import { describe, expect, it } from 'vitest';
import { buildTelemetry, generateSparkline } from './telemetry';
import type { Machine } from '@/types';

const stubMachine = (status: Machine['status']): Machine => ({
  id: 'TEST-1',
  shortCode: 'TST',
  name: 'Test Machine',
  type: 'Iniezione',
  department: 'Test',
  status,
  primaryMetric: '—',
  primaryMetricSub: '—',
});

describe('buildTelemetry', () => {
  it('produces the requested number of hourly readings', () => {
    const readings = buildTelemetry(stubMachine('ok'), 24);
    expect(readings).toHaveLength(24);
  });

  it('emits valid numeric values regardless of index — guards bug #2', () => {
    const readings = buildTelemetry(stubMachine('crit'), 24);
    for (const r of readings) {
      expect(Number.isFinite(r.current)).toBe(true);
      expect(r.current).toBeGreaterThanOrEqual(0);
    }
  });

  it('emits identical baseline and threshold for every row', () => {
    const readings = buildTelemetry(stubMachine('ok'), 12);
    const baselines = new Set(readings.map((r) => r.baseline));
    const thresholds = new Set(readings.map((r) => r.threshold));
    expect(baselines.size).toBe(1);
    expect(thresholds.size).toBe(1);
  });

  it('handles 0-hour requests without throwing', () => {
    expect(() => buildTelemetry(stubMachine('ok'), 0)).not.toThrow();
    expect(buildTelemetry(stubMachine('ok'), 0)).toEqual([]);
  });
});

describe('generateSparkline', () => {
  it('produces the requested number of points', () => {
    expect(generateSparkline(50, 10, 0, 30)).toHaveLength(30);
  });

  it('clamps values at zero — they should never go negative', () => {
    const values = generateSparkline(0, 100, -100, 50);
    expect(values.every((v) => v >= 0)).toBe(true);
  });
});
