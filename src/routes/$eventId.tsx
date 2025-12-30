import EventsDetails from '@/pages/home/events/details';
import GuestDetailsPage from '@/pages/home/events/details/guest-details';
import RootLayout from '@/pages/home/layout';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/$eventId')({
  component: RouteComponent,
  validateSearch: z.object({
    guest: z.string().optional(),
  }),
});

function RouteComponent() {
  const { guest } = useSearch({
    from: '/$eventId',
  });

  return (
    <RootLayout>{guest ? <GuestDetailsPage /> : <EventsDetails />}</RootLayout>
  );
}
