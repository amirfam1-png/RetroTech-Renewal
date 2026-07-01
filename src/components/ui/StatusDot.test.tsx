import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { StatusDot } from './StatusDot';

describe('StatusDot', () => {
  it('applies the OK color', () => {
    const { container } = render(<StatusDot status="ok" />);
    expect(container.firstChild).toHaveClass('bg-status-ok');
  });

  it('applies the critical color and pulse animation', () => {
    const { container } = render(<StatusDot status="crit" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('bg-status-crit');
    expect(el.className).toContain('animate-pulse-crit');
  });

  it('does not animate the idle status', () => {
    const { container } = render(<StatusDot status="idle" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).not.toContain('animate-pulse');
  });
});
