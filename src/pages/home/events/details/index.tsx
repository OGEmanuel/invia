import StarCalendar from '@/assets/jsx-icons/star-calendar';
import EmptyState from './empty-state';
import { cn, formatDateToShortMonth } from '@/lib/utils';
import GuestList from './guest-list';
import EventDetailsLayout, {
  EventDetailsLayoutHeader,
  GuestDetails,
} from './layout';
import { useParams } from '@tanstack/react-router';
import type { Events, GuestData } from '@/lib/constants';
import { useGetEventsInfo, useGetGuests } from '@/lib/queries/hooks';
import NotFound from '@/pages/not-found';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/queries/query-keys';

const EventsDetails = () => {
  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useGetEventsInfo(eventId);
  const { data: guestsData, isError: guestsIsError } = useGetGuests(
    1,
    50,
    eventId,
  );
  const guests: GuestData = guestsData?.data;

  const info: Events = data?.data;

  return (
    <EventDetailsLayout>
      <EventDetailsLayoutHeader link={'/'} linkLabel={'Back to events'}>
        {isError ? (
          <NotFound
            header="Unable to fetch Events Info"
            description="Check your internet connection and try againg or contact our support team for more."
            className="w-full max-w-none flex-row justify-between text-start [&>div]:flex-row"
            actionLabel="Retry"
            action={() =>
              queryClient.invalidateQueries({
                queryKey: QUERY_KEYS.events.info(eventId),
              })
            }
          />
        ) : isPending ? (
          <EventDetailsSkeleton />
        ) : (
          <GuestDetails header={info.name}>
            <div className="flex items-center gap-1.5">
              <StarCalendar fill="#A3A19D" />
              <p className="leading-[100%] -tracking-[0.02em] text-[#575554]">
                {formatDateToShortMonth(info.date)}
              </p>
            </div>
          </GuestDetails>
        )}
      </EventDetailsLayoutHeader>
      {isPending ? <InviteStatsSkeleton /> : isError ? null : <InviteStats />}
      {guestsIsError ? (
        <NotFound
          header="Unable to fetch Guests List"
          description="Check your internet connection and try againg or contact our support team for more."
          action={() =>
            queryClient.invalidateQueries({
              queryKey: QUERY_KEYS.events.guests(1, 50, eventId),
            })
          }
          actionLabel="Retry"
        />
      ) : guests?.guests.length > 1 ? (
        <GuestList />
      ) : (
        <EmptyState
          header="No guests yet"
          description="Guests added to this event will appear here."
        />
      )}
    </EventDetailsLayout>
  );
};

export default EventsDetails;

const InviteStats = () => {
  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });
  const { data } = useGetEventsInfo(eventId);
  const info: Events = data?.data;

  return (
    <div className="scrollbar-hidden max-lg:w-full max-lg:overflow-auto max-md:px-5 md:max-xl:px-8">
      <div className="flex justify-between rounded-[12px] border border-[#0000001A] max-lg:w-max [&>div]:flex [&>div]:flex-col [&>div]:gap-3 [&>div]:border-r [&>div]:border-[#0000001A] [&>div]:p-4 [&>div]:last:border-r-0 max-lg:[&>div]:w-43 lg:[&>div]:basis-full">
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Total guest
          </p>
          <p className="font-serif text-2xl/8 text-[#212121]">
            {info.totalGuests.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Invite sent
          </p>
          <p className="font-serif text-2xl/8 text-[#212121]">
            {info.sentInvites.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Confirmed RSVP
          </p>
          <p className="font-serif text-2xl/8 text-[#212121]">
            {info.acceptedInvites.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Awaiting Response
          </p>
          <p className="font-serif text-2xl/8 text-[#212121]">
            {info.pendingInvites.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Failed Delivery
          </p>
          <p
            className={cn(
              'font-serif text-2xl/8 text-[#212121]',
              info.failedInvites > 0 && 'text-[#FF383C]',
            )}
          >
            {info.failedInvites.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const EventDetailsSkeleton = () => {
  return (
    <div className="flex max-lg:flex-col max-lg:gap-6 md:justify-between lg:items-center">
      {/* Left section */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-48 animate-pulse rounded-md bg-[#00000014]" />
        <div className="h-4 w-64 animate-pulse rounded-md bg-[#00000014]" />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 md:max-lg:justify-end">
        <div className="h-10 w-32 animate-pulse rounded-md bg-[#00000014]" />
        <div className="h-10 w-36 animate-pulse rounded-md bg-[#00000014]" />
        <div className="hidden h-10 w-10 animate-pulse rounded-md bg-[#00000014] lg:block" />
      </div>
    </div>
  );
};

const InviteStatsSkeleton = () => {
  return (
    <div className="scrollbar-hidden max-lg:w-full max-lg:overflow-auto max-md:px-5 md:max-xl:px-8">
      <div className="flex justify-between rounded-[12px] border border-[#0000001A] max-lg:w-max [&>div]:flex [&>div]:flex-col [&>div]:gap-3 [&>div]:border-r [&>div]:border-[#0000001A] [&>div]:p-4 [&>div]:last:border-r-0 max-lg:[&>div]:w-43 lg:[&>div]:basis-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div className="h-4 w-28 animate-pulse rounded-md bg-[#00000014]" />
            <div className="h-8 w-20 animate-pulse rounded-md bg-[#00000014]" />
          </div>
        ))}
      </div>
    </div>
  );
};
