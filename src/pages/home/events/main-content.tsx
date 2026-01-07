//297px is the height of the navbar + the height of the banner
//326px is the height of the navbar + the height of the banner for mobile

import EmptyState from './empty-state';
import EventsView, { EventsLoadingView } from './events-view';
import type { EventData } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useGetAllEvents } from '@/lib/queries/hooks';

const MainContent = () => {
  const { data, isPending, isError } = useGetAllEvents(1, 1);
  const events: EventData = data?.data;

  return (
    <section className="flex min-h-[calc(100vh-326px)] justify-center md:min-h-[calc(100vh-297px)]">
      <div
        className={cn(
          'flex w-full max-w-300',
          events?.events?.length < 1 && 'items-center justify-center',
        )}
      >
        {isError ? (
          <p>Error Fetching events</p>
        ) : isPending ? (
          <EventsLoadingView />
        ) : events.events.length > 0 ? (
          <EventsView />
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
};

export default MainContent;
