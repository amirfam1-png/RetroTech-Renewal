import { useMemo } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { Machine } from '@/types';
import { buildTelemetry, generateSparkline } from '@/lib/telemetry';

type DetailChartVariant = 'live' | 'vibration' | 'temperature' | 'cycles' | 'history';

interface DetailChartProps {
  machine: Machine;
  variant?: DetailChartVariant;
}

const COLORS = {
  primary: '#1b4a5a',
  rust: '#c97a40',
  crit: '#b33a3a',
  grid: 'rgba(26, 37, 48, 0.06)',
  text: '#5c6670',
};

const TICK_STYLE = { fontSize: 11, fill: COLORS.text } as const;

interface ChartConfig {
  primaryKey: string;
  primaryLabel: string;
  unit: string;
  baseline: number;
  threshold: number;
  seriesGenerator: (machine: Machine, hours: number) => Array<Record<string, string | number>>;
}

function liveSeriesGenerator(machine: Machine, hours: number) {
  return buildTelemetry(machine, hours).map((t) => ({
    hour: t.hour,
    value: t.current,
    baseline: t.baseline,
    threshold: t.threshold,
  }));
}

function makeSeriesGenerator(base: number, noise: number, trend: number, baseline: number, threshold: number) {
  return (_machine: Machine, hours: number) => {
    const values = generateSparkline(base, noise, trend, hours);
    return values.map((v, i) => ({
      hour: `${i.toString().padStart(2, '0')}:00`,
      value: Number(v.toFixed(2)),
      baseline,
      threshold,
    }));
  };
}

const CHART_VARIANTS: Record<DetailChartVariant, ChartConfig> = {
  live: {
    primaryKey: 'value',
    primaryLabel: 'Corrente',
    unit: 'A',
    baseline: 33.4,
    threshold: 38,
    seriesGenerator: liveSeriesGenerator,
  },
  vibration: {
    primaryKey: 'value',
    primaryLabel: 'Vibrazione RMS',
    unit: 'mm/s',
    baseline: 2.8,
    threshold: 4.5,
    seriesGenerator: makeSeriesGenerator(3.2, 0.8, 1.3, 2.8, 4.5),
  },
  temperature: {
    primaryKey: 'value',
    primaryLabel: 'Temperatura',
    unit: '°C',
    baseline: 62,
    threshold: 70,
    seriesGenerator: makeSeriesGenerator(64, 4, 6, 62, 70),
  },
  cycles: {
    primaryKey: 'value',
    primaryLabel: 'Cicli / ora',
    unit: 'cph',
    baseline: 150,
    threshold: 130,
    seriesGenerator: makeSeriesGenerator(148, 8, -4, 150, 130),
  },
  history: {
    primaryKey: 'value',
    primaryLabel: 'Storico OEE',
    unit: '%',
    baseline: 75,
    threshold: 65,
    seriesGenerator: makeSeriesGenerator(72, 6, 3, 75, 65),
  },
};

export function DetailChart({ machine, variant = 'live' }: DetailChartProps) {
  const config = CHART_VARIANTS[variant];
  const data = useMemo(
    () => config.seriesGenerator(machine, 24),
    [machine, config],
  );

  return (
    <div className="relative h-60 px-5 pb-2 pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 8, bottom: 0, left: -10 }}>
          <CartesianGrid stroke={COLORS.grid} vertical={false} />
          <XAxis
            dataKey="hour"
            tickLine={false}
            axisLine={false}
            tick={TICK_STYLE}
            interval="preserveStartEnd"
            minTickGap={36}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={TICK_STYLE}
            width={48}
            tickFormatter={(v: number) => `${v} ${config.unit}`}
            domain={['dataMin - 2', 'dataMax + 2']}
          />
          <Tooltip
            contentStyle={{
              background: '#1a2530',
              border: 0,
              borderRadius: 4,
              padding: 10,
              color: '#fff',
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 11,
            }}
            labelStyle={{ fontWeight: 500, marginBottom: 4 }}
            itemStyle={{ fontFamily: "'IBM Plex Mono', monospace" }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="square"
            iconSize={9}
            wrapperStyle={{ fontSize: 11, paddingBottom: 8 }}
          />
          <Line
            type="monotone"
            dataKey={config.primaryKey}
            name={`${config.primaryLabel} (${config.unit})`}
            stroke={COLORS.primary}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="baseline"
            name="Baseline (ML)"
            stroke={COLORS.rust}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="threshold"
            name="Soglia di allarme"
            stroke={COLORS.crit}
            strokeWidth={1.5}
            strokeDasharray="2 3"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
