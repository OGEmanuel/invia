import Corporate from '@/assets/jsx-icons/corporate';
import Heart from '@/assets/jsx-icons/heart';
import Others from '@/assets/jsx-icons/others';
import Party from '@/assets/jsx-icons/party';
import People from '@/assets/jsx-icons/people';
import StarCalendar from '@/assets/jsx-icons/star-calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { useQueryState } from 'nuqs';

const EVENTS = [
  {
    id: 1,
    type: 'wedding',
    title: 'Mr. & Mrs. Williams’ Wedding',
    date: 'Jun 15, 2026',
    invitees: 1321,
    sent: 1321,
    confirmed: 1210,
    pending: 321,
    failed: 24,
  },
  {
    id: 2,
    type: 'party',
    title: 'Mr. & Mrs. Williams’ Wedding',
    date: 'Jun 15, 2026',
    invitees: 0,
    sent: 0,
    confirmed: 0,
    pending: 0,
    failed: 0,
  },
  {
    id: 3,
    type: 'others',
    title: 'Mr. & Mrs. Williams’ Wedding',
    date: 'Jun 15, 2026',
    invitees: 1321,
    sent: 1321,
    confirmed: 1210,
    pending: 321,
    failed: 24,
  },
  {
    id: 4,
    type: 'corporate',
    title: 'Mr. & Mrs. Williams’ Wedding',
    date: 'Jun 15, 2026',
    invitees: 1321,
    sent: 1321,
    confirmed: 1210,
    pending: 321,
    failed: 24,
  },
  {
    id: 5,
    type: 'wedding',
    title: 'Mr. & Mrs. Williams’ Wedding',
    date: 'Jun 15, 2026',
    invitees: 1321,
    sent: 1321,
    confirmed: 1210,
    pending: 321,
    failed: 24,
  },
  {
    id: 6,
    type: 'corporate',
    title: 'Mr. & Mrs. Williams’ Wedding',
    date: 'Jun 15, 2026',
    invitees: 1321,
    sent: 1321,
    confirmed: 1210,
    pending: 321,
    failed: 24,
  },
  {
    id: 7,
    type: 'wedding',
    title: 'Mr. & Mrs. Williams’ Wedding',
    date: 'Jun 15, 2026',
    invitees: 1321,
    sent: 1321,
    confirmed: 1210,
    pending: 321,
    failed: 24,
  },
  {
    id: 8,
    type: 'party',
    title: 'Mr. & Mrs. Williams’ Wedding',
    date: 'Jun 15, 2026',
    invitees: 0,
    sent: 0,
    confirmed: 0,
    pending: 0,
    failed: 0,
  },
  {
    id: 9,
    type: 'others',
    title: 'Mr. & Mrs. Williams’ Wedding',
    date: 'Jun 15, 2026',
    invitees: 1321,
    sent: 1321,
    confirmed: 1210,
    pending: 321,
    failed: 24,
  },
];

const EventsView = () => {
  return (
    <div className="flex w-full flex-col gap-4 py-5 max-md:px-5 md:gap-6 md:py-6 md:max-xl:px-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="font-serif leading-6 text-[#212121]">Your Events</p>
          <p className="text-sm/5 -tracking-[0.02em]">
            <span className="font-medium">3</span> active projects
          </p>
        </div>
        <SelectEvents />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {EVENTS.map(event => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default EventsView;

const EventCard = ({
  id,
  type,
  title,
  date,
  invitees,
  sent,
  confirmed,
  pending,
  failed,
}: (typeof EVENTS)[0]) => {
  return (
    <div className="relative rounded-[12px] border border-[#00000014] bg-[#FEFCF9] transition-transform active:scale-95">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-2">
          <div
            className={cn(
              'flex w-max items-center gap-1 rounded-xl border px-3 py-2',
              type === 'wedding' && 'border-[#874CF933] bg-[#F9F6FF]',
              type === 'party' && 'border-[#479FFD33] bg-[#F6FAFF]',
              type === 'others' && 'border-[#FD843D33] bg-[#FFF9F5]',
              type === 'corporate' && 'border-[#2EC31B33] bg-[#F5FCF4]',
            )}
          >
            {type === 'wedding' && <Heart />}
            {type === 'party' && <Party />}
            {type === 'others' && <Others />}
            {type === 'corporate' && <Corporate />}
            <p
              className={cn(
                'text-xs/[100%] font-medium -tracking-[0.02em] capitalize',
                type === 'wedding' && 'text-[#874CF9]',
                type === 'party' && 'text-[#479FFD]',
                type === 'others' && 'text-[#FD843D]',
                type === 'corporate' && 'text-[#2EC31B]',
              )}
            >
              {type}
            </p>
          </div>
          <Link
            to={'/$eventId'}
            params={{
              eventId: `${id}`,
            }}
            className="font-serif leading-6 text-[#212121]"
          >
            <span className="absolute inset-0"></span>
            {title}
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StarCalendar fill={'#A3A19D'} size="20" />
            <p className="text-sm/[100%] -tracking-[0.02em] text-[#575554]">
              {date}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <People />
            <p className="text-sm/[100%] -tracking-[0.02em] text-[#626262]">
              {invitees > 0 ? (
                invitees.toLocaleString()
              ) : (
                <span className="text-[#A3A19D]">-- --</span>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[#0000000D] p-4 text-center">
        <div className="flex flex-col gap-0.5">
          <p className="leading-[100%] font-semibold -tracking-[0.02em] text-[#212121]">
            {sent > 0 ? (
              sent.toLocaleString()
            ) : (
              <span className="text-[#A3A19D]">-- --</span>
            )}
          </p>
          <p className="text-xs/[100%] -tracking-[0.02em] text-[#575554]">
            Sent
          </p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="leading-[100%] font-semibold -tracking-[0.02em] text-[#212121]">
            {confirmed > 0 ? (
              confirmed.toLocaleString()
            ) : (
              <span className="text-[#A3A19D]">-- --</span>
            )}
          </p>
          <p className="text-xs/[100%] -tracking-[0.02em] text-[#575554]">
            Confirmed
          </p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="leading-[100%] font-semibold -tracking-[0.02em] text-[#212121]">
            {pending > 0 ? (
              pending.toLocaleString()
            ) : (
              <span className="text-[#A3A19D]">-- --</span>
            )}
          </p>
          <p className="text-xs/[100%] -tracking-[0.02em] text-[#575554]">
            Pending
          </p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="leading-[100%] font-semibold -tracking-[0.02em] text-[#FF383C]">
            {failed > 0 ? (
              failed.toLocaleString()
            ) : (
              <span className="text-[#A3A19D]">-- --</span>
            )}
          </p>
          <p className="text-xs/[100%] -tracking-[0.02em] text-[#575554]">
            Failed
          </p>
        </div>
      </div>
    </div>
  );
};

const SelectEvents = () => {
  const [_, setEvents] = useQueryState('events');
  return (
    <Select onValueChange={setEvents}>
      <SelectTrigger>
        <SelectValue placeholder="All events" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};
