import RootLayout from '@/pages/home/layout';
import SettingsLayout from '@/pages/home/settings/layout';
import Members from '@/pages/home/settings/members';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/settings/members')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RootLayout>
      <SettingsLayout>
        <Members />
      </SettingsLayout>
    </RootLayout>
  );
}
