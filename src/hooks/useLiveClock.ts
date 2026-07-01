import { useEffect, useState } from 'react';

/**
 * Returns a Date that updates every `intervalMs` (default 30s).
 * Used by the topbar live clock; replace by an authoritative timestamp from
 * the gateway when wiring real telemetry.
 */
export function useLiveClock(intervalMs = 30_000): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return now;
}
