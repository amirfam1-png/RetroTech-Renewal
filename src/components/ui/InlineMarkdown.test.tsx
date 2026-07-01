import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InlineMarkdown } from './InlineMarkdown';

describe('InlineMarkdown', () => {
  it('renders **bold** as <strong>', () => {
    render(<InlineMarkdown text="aumento del **14.3%** registrato" />);
    expect(screen.getByText('14.3%').tagName).toBe('STRONG');
  });

  it('does not interpret raw HTML — guards against XSS', () => {
    const malicious = 'normal text <script>alert(1)</script> more';
    const { container } = render(<InlineMarkdown text={malicious} />);
    // The script tag should be rendered as literal text, not parsed
    expect(container.querySelector('script')).toBeNull();
    expect(container.textContent).toContain('<script>');
  });

  it('renders paragraph breaks on double newline', () => {
    const { container } = render(
      <InlineMarkdown text={'first paragraph\n\nsecond paragraph'} />,
    );
    const brs = container.querySelectorAll('br');
    expect(brs.length).toBeGreaterThanOrEqual(2);
  });

  it('handles the empty string without crashing', () => {
    expect(() => render(<InlineMarkdown text="" />)).not.toThrow();
  });
});
