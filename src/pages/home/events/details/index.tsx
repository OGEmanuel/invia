import StarCalendar from '@/assets/jsx-icons/star-calendar';
// import EmptyState from './empty-state';
import { cn } from '@/lib/utils';
import GuestList from './guest-list';
import EventDetailsLayout, {
  EventDetailsLayoutHeader,
  GuestDetails,
} from './layout';

const EventsDetails = () => {
  return (
    <EventDetailsLayout>
      <EventDetailsLayoutHeader link={'/'} linkLabel={'Back to events'}>
        <GuestDetails header="Mr. & Mrs. Williams’ Wedding">
          <div className="flex items-center gap-1.5">
            <StarCalendar fill="#A3A19D" />
            <p className="leading-[100%] -tracking-[0.02em] text-[#575554]">
              Sat. Jun 15, 2026
            </p>
          </div>
        </GuestDetails>
      </EventDetailsLayoutHeader>
      <InviteStats />
      {/* <EmptyState /> */}
      <GuestList />
    </EventDetailsLayout>
  );
};

export default EventsDetails;

const Details = {
  total_guests: 2291,
  invite_sent: 2111,
  confirmed_rsvp: 2291,
  awaiting_response: 2291,
  failed_delivery: 2291,
};

const InviteStats = () => {
  return (
    <div className="scrollbar-hidden max-lg:w-full max-lg:overflow-auto max-md:px-5 md:max-xl:px-8">
      <div className="flex justify-between rounded-[12px] border border-[#0000001A] max-lg:w-max [&>div]:flex [&>div]:flex-col [&>div]:gap-3 [&>div]:border-r [&>div]:border-[#0000001A] [&>div]:p-4 [&>div]:last:border-r-0 max-lg:[&>div]:w-43 lg:[&>div]:basis-full">
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Total guest
          </p>
          <p className="font-serif text-2xl/8 text-[#212121]">
            {Details.total_guests.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Invite sent
          </p>
          <p className="font-serif text-2xl/8 text-[#212121]">
            {Details.invite_sent.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Confirmed RSVP
          </p>
          <p className="font-serif text-2xl/8 text-[#212121]">
            {Details.confirmed_rsvp.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Awaiting Response
          </p>
          <p className="font-serif text-2xl/8 text-[#212121]">
            {Details.awaiting_response.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Failed Delivery
          </p>
          <p
            className={cn(
              'font-serif text-2xl/8 text-[#212121]',
              Details.failed_delivery > 0 && 'text-[#FF383C]',
            )}
          >
            {Details.failed_delivery.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
