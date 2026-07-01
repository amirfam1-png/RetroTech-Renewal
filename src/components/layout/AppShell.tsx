import type { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div
      className="grid h-screen min-h-[760px]"
      style={{
        gridTemplateColumns: '240px 1fr',
        gridTemplateRows: '64px 1fr',
      }}
    >
      <TopBar />
      <Sidebar />
      <main className="overflow-y-auto px-8 pb-8 pt-6">{children}</main>
    </div>
  );
}
