import ShareGuestList from '@/pages/share-guest-list';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/share-guest-list/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ShareGuestList />;
}
