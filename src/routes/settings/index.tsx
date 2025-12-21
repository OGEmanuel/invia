import RootLayout from '@/pages/home/layout';
import Settings from '@/pages/home/settings';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RootLayout>
      <Settings />
    </RootLayout>
  );
}
