import EventsDetails from '@/pages/home/events/details';
import RootLayout from '@/pages/home/layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$eventId')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RootLayout>
      <EventsDetails />
    </RootLayout>
  );
}
