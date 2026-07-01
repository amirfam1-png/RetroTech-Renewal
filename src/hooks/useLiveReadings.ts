import { useEffect, useState } from 'react';

interface LiveReadings {
  current: number;
  vibration: number;
  temperature: number;
  cyclesPerHour: number;
}

/**
 * Simulates the high-frequency telemetry that would be streamed from the
 * edge gateway via WebSocket. The variance is calibrated so values feel
 * "alive" without distracting the viewer.
 */
export function useLiveReadings(machineId: string): LiveReadings {
  const [readings, setReadings] = useState<LiveReadings>(() =>
    baseFor(machineId),
  );

  useEffect(() => {
    setReadings(baseFor(machineId));
    const id = window.setInterval(() => {
      setReadings((prev) => ({
        current: jitter(prev.current, 0.4),
        vibration: jitter(prev.vibration, 0.2),
        temperature: prev.temperature,
        cyclesPerHour: prev.cyclesPerHour,
      }));
    }, 6_000);
    return () => window.clearInterval(id);
  }, [machineId]);

  return readings;
}

function jitter(value: number, range: number): number {
  return value + (Math.random() - 0.5) * range;
}

function baseFor(_machineId: string): LiveReadings {
  return {
    current: 38.2,
    vibration: 4.7,
    temperature: 68,
    cyclesPerHour: 142,
  };
}
