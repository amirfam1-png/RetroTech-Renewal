import { AppShell } from '@/components/layout/AppShell';
import { DashboardPage } from '@/components/dashboard/DashboardPage';

export function DashboardRoute() {
  return (
    <AppShell>
      <DashboardPage />
    </AppShell>
  );
}
