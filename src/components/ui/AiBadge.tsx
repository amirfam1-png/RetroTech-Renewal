import type { ClaudeModel } from '@/types';

export function AiBadge({ model }: { model: ClaudeModel }) {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-bg-subtle px-1.5 py-px font-mono text-[10px] font-medium text-brand-rust">
      {model}
    </span>
  );
}
