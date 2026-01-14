import RootLayout from '@/pages/home/layout';
import SettingsLayout from '@/pages/home/settings/layout';
import PlanBillings from '@/pages/home/settings/plan-billings.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/settings/plan-billings')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RootLayout>
      <SettingsLayout>
        <PlanBillings />
      </SettingsLayout>
    </RootLayout>
  );
}
