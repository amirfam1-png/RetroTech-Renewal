import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';
import { generateSparkline } from '@/lib/telemetry';

interface SparklineProps {
  base: number;
  noise: number;
  trend: number;
  color: string;
}

export function Sparkline({ base, noise, trend, color }: SparklineProps) {
  const data = useMemo(
    () =>
      generateSparkline(base, noise, trend).map((value, index) => ({
        index,
        value,
      })),
    [base, noise, trend],
  );

  return (
    <div aria-hidden="true" className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Area
            dataKey="value"
            type="monotone"
            stroke={color}
            strokeWidth={1.5}
            fill={`${color}22`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
