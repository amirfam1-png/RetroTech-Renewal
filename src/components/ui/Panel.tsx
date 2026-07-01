import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface PanelProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

export function Panel({
  title,
  subtitle,
  action,
  className,
  bodyClassName,
  children,
  style,
}: PanelProps) {
  return (
    <section
      className={cn(
        'flex animate-fade-up flex-col overflow-hidden rounded-lg border border-edge bg-bg-card',
        className,
      )}
      style={style}
    >
      {(title || subtitle || action) && (
        <header className="flex items-center justify-between border-b border-edge px-[18px] py-3.5">
          <div>
            {title && (
              <div className="font-serif text-[14px] font-semibold text-ink-primary">
                {title}
              </div>
            )}
            {subtitle && (
              <div className="mt-0.5 text-[11px] text-ink-muted">{subtitle}</div>
            )}
          </div>
          {action}
        </header>
      )}
      <div className={cn('flex-1 overflow-y-auto', bodyClassName)}>
        {children}
      </div>
    </section>
  );
}

export function PanelAction({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-transparent text-xs font-medium text-brand-deep transition hover:text-brand-rust"
    >
      {children}
    </button>
  );
}
