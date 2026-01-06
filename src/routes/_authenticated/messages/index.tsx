import RootLayout from '@/pages/home/layout';
import Messages from '@/pages/home/messages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/messages/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RootLayout>
      <Messages />
    </RootLayout>
  );
}
