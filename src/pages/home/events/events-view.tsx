import Corporate from '@/assets/jsx-icons/corporate';
import Heart from '@/assets/jsx-icons/heart';
import Others from '@/assets/jsx-icons/others';
import Party from '@/assets/jsx-icons/party';
import People from '@/assets/jsx-icons/people';
import StarCalendar from '@/assets/jsx-icons/star-calendar';
import { Pagination } from '@/components/ui/custom/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { EventData, Events } from '@/lib/constants';
import { useGetAllEvents } from '@/lib/queries/hooks';
import { cn, formatDateToShortMonth } from '@/lib/utils';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useQueryState } from 'nuqs';

const EventsView = () => {
  const { page } = useSearch({ from: '/_authenticated/' });
  const { data, isPending } = useGetAllEvents(page, 12);
  const navigate = useNavigate({
    from: '/',
  });
  const events: EventData = data?.data;

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
        {isPending
          ? Array(12)
              .fill(null)
              .map((_, i) => <EventCardSkeleton key={i} />)
          : events.events.map(event => <EventCard key={event.id} {...event} />)}
      </div>
      {events && (
        <Pagination
          currentPage={page}
          totalPages={events.totalPages}
          onPageChange={page =>
            navigate({
              search: () => ({
                limit: 12,
                page,
              }),
            })
          }
          onNextPage={() =>
            navigate({
              search: () => ({
                limit: 12,
                page: page + 1,
              }),
            })
          }
          onPreviousPage={() =>
            navigate({
              search: () => ({
                limit: 12,
                page: page - 1,
              }),
            })
          }
        />
      )}
    </div>
  );
};

export default EventsView;

const EventCard = ({
  id,
  acceptedInvites,
  pendingInvites,
  failedInvites,
  sentInvites,
  totalGuests,
  category,
  date,
  name,
}: Events) => {
  return (
    <div className="relative rounded-[12px] border border-[#00000014] bg-[#FEFCF9] transition-transform active:scale-95">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-2">
          <div
            className={cn(
              'flex w-max items-center gap-1 rounded-[8px] border px-3 py-2',
              category.toLowerCase() === 'wedding' &&
                'border-[#874CF933] bg-[#F9F6FF]',
              category.toLowerCase() === 'party' &&
                'border-[#479FFD33] bg-[#F6FAFF]',
              category.toLowerCase() === 'others' &&
                'border-[#FD843D33] bg-[#FFF9F5]',
              category.toLowerCase() === 'corporate' &&
                'border-[#2EC31B33] bg-[#F5FCF4]',
            )}
          >
            {category.toLowerCase() === 'wedding' && <Heart />}
            {category.toLowerCase() === 'party' && <Party />}
            {category.toLowerCase() === 'others' && <Others />}
            {category.toLowerCase() === 'corporate' && <Corporate />}
            <p
              className={cn(
                'text-xs/[100%] font-medium -tracking-[0.02em] capitalize',
                category.toLowerCase() === 'wedding' && 'text-[#874CF9]',
                category.toLowerCase() === 'party' && 'text-[#479FFD]',
                category.toLowerCase() === 'others' && 'text-[#FD843D]',
                category.toLowerCase() === 'corporate' && 'text-[#2EC31B]',
              )}
            >
              {category}
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
            {name}
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StarCalendar fill={'#A3A19D'} size="20" />
            <p className="text-sm/[100%] -tracking-[0.02em] text-[#575554]">
              {formatDateToShortMonth(date)}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <People />
            <p className="text-sm/[100%] -tracking-[0.02em] text-[#626262]">
              {totalGuests > 0 ? (
                totalGuests.toLocaleString()
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
            {sentInvites > 0 ? (
              sentInvites.toLocaleString()
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
            {acceptedInvites > 0 ? (
              acceptedInvites.toLocaleString()
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
            {pendingInvites > 0 ? (
              pendingInvites.toLocaleString()
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
            {failedInvites > 0 ? (
              failedInvites.toLocaleString()
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
    <Select onValueChange={setEvents} defaultValue="all">
      <SelectTrigger>
        <SelectValue placeholder="All events" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All events</SelectItem>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

export const EventsLoadingView = () => {
  return (
    <div className="flex w-full flex-col gap-4 py-5 max-md:px-5 md:gap-6 md:py-6 md:max-xl:px-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
          <div className="mt-1 h-5 w-28 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200"></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
      </div>
    </div>
  );
};

const EventCardSkeleton = () => {
  return (
    <div className="relative rounded-[12px] border border-[#00000014] bg-[#FEFCF9]">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-2">
          {/* Type badge skeleton */}
          <div className="h-9 w-28 animate-pulse rounded-xl bg-gray-200"></div>

          {/* Title skeleton */}
          <div className="flex flex-col gap-2">
            <div className="h-6 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>

        {/* Date and invitees skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-12 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>

      {/* Stats footer skeleton */}
      <div className="flex items-center justify-between border-t border-[#0000000D] p-4 text-center">
        <div className="flex flex-col items-center gap-0.5">
          <div className="h-4 w-10 animate-pulse rounded bg-gray-200"></div>
          <div className="mt-1 h-3 w-8 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="h-4 w-10 animate-pulse rounded bg-gray-200"></div>
          <div className="mt-1 h-3 w-12 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="h-4 w-10 animate-pulse rounded bg-gray-200"></div>
          <div className="mt-1 h-3 w-11 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="h-4 w-10 animate-pulse rounded bg-gray-200"></div>
          <div className="mt-1 h-3 w-9 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};
