import AddGuests from '@/pages/home/events/details/add-guests';
import EventsDetails from '@/pages/home/events/details';
import GuestDetailsPage from '@/pages/home/events/details/guest-details';
import RootLayout from '@/pages/home/layout';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/_authenticated/$eventId')({
  component: RouteComponent,
  validateSearch: z.object({
    guest: z.string().optional(),
    addGuest: z.boolean().optional(),
    page: z.number().catch(1),
    limit: z.number().catch(50),
  }),
});

function RouteComponent() {
  const { guest, addGuest } = useSearch({
    from: '/_authenticated/$eventId',
  });

  return (
    <>
      {addGuest ? (
        <AddGuests />
      ) : (
        <RootLayout>
          {guest ? <GuestDetailsPage /> : <EventsDetails />}
        </RootLayout>
      )}
    </>
  );
}
