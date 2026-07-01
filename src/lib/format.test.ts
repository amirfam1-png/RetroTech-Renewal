import { describe, expect, it } from 'vitest';
import { formatItalianDateTime, formatItalianTime } from './format';

describe('formatItalianDateTime', () => {
  it('uses the abbreviated Italian month names', () => {
    const date = new Date(2026, 4, 15, 14, 37); // 15 May 2026, 14:37 local
    expect(formatItalianDateTime(date)).toBe('15 mag 2026 · 14:37');
  });

  it('zero-pads hours and minutes', () => {
    const date = new Date(2026, 0, 5, 9, 7); // 5 gen, 09:07
    expect(formatItalianDateTime(date)).toBe('5 gen 2026 · 09:07');
  });

  it('handles the December rollover boundary', () => {
    const date = new Date(2025, 11, 31, 23, 59);
    expect(formatItalianDateTime(date)).toBe('31 dic 2025 · 23:59');
  });
});

describe('formatItalianTime', () => {
  it('renders HH:MM:SS with zero-padding', () => {
    const date = new Date(2026, 4, 15, 8, 5, 3);
    expect(formatItalianTime(date)).toBe('08:05:03');
  });

  it('renders midnight correctly', () => {
    const date = new Date(2026, 0, 1, 0, 0, 0);
    expect(formatItalianTime(date)).toBe('00:00:00');
  });
});
