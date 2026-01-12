import ShareAddGuests from '@/pages/share-guest-list/share-add-guests.tsx';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

export const Route = createFileRoute('/share-guest-list/$eventId')({
  component: RouteComponent,
  validateSearch: z.object({
    guest: z.string().optional(),
    addGuest: z.coerce.boolean().optional(),
    guestFilter: z.string().optional(),
  }),
});

function RouteComponent() {
  return <ShareAddGuests />;
}
