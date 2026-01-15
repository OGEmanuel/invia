import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useQueryState, type Options } from 'nuqs';
import DataTable from './data-table';
import { columns, columnsSkeleton } from './columns';
import type { GuestData, Guests } from '@/lib/constants';
import { Pagination } from '@/components/ui/custom/pagination';
import { cn } from '@/lib/utils';
import {
  Link,
  useNavigate,
  useParams,
  useSearch,
} from '@tanstack/react-router';
import { useGetGuests } from '@/lib/queries/hooks';
import Skeleton from '@/components/ui/custom/skeleton';
import EmptyState from './empty-state';

const GuestList = () => {
  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });
  const { page } = useSearch({ from: '/_authenticated/$eventId' });
  const navigate = useNavigate({
    from: '/$eventId',
  });
  const { data: guestsData, isPending } = useGetGuests(1, 50, eventId);
  const guests: GuestData = guestsData?.data;

  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      id: `${i}`,
      name: `Mrs & Mrs Olawale Cole`,
      party: `Groom`,
      phone: `+234 7048099032`,
      email: `bojnuga@gmail.com`,
      isInviteSent: Math.random() > 0.5,
      isInviteRSVP: Math.random() > 0.5,
      isInviteDelivered: Math.random() > 0.5,
    });
  }

  if (guests && guests.guests.length < 1) {
    return (
      <EmptyState
        header="No guests yet"
        description="Guests added to this event will appear here."
      />
    );
  }

  return (
    <section className="flex flex-col gap-6 max-md:px-5 md:max-xl:px-8">
      <GuestListConfig />
      <hr className="border-y-[0.5px] border-[#00000014] sm:hidden" />
      <div className="flex flex-col gap-6 xl:hidden">
        {isPending ? (
          <GuestCardLoading />
        ) : (
          guests.guests.map((guest, i) => (
            <div key={guest.id} className="flex flex-col gap-6">
              <GuestCard {...guest} />
              {i !== data.length - 1 && (
                <hr className="h-2.5 border-none bg-[#F7F5F2]" />
              )}
            </div>
          ))
        )}
      </div>
      <div className="flex flex-col gap-2">
        {isPending ? (
          <DataTable
            data={data}
            columns={columnsSkeleton}
            className="max-xl:hidden"
            isFirstChildHidden
          />
        ) : (
          <DataTable
            data={guests.guests}
            columns={columns}
            className="max-xl:hidden"
            isFirstChildHidden
          />
        )}
        {guests?.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={guests.totalPages}
            onPageChange={page =>
              navigate({
                search: () => ({
                  limit: 50,
                  page,
                }),
              })
            }
            onNextPage={() =>
              navigate({
                search: () => ({
                  limit: 50,
                  page: page + 1,
                }),
              })
            }
            onPreviousPage={() =>
              navigate({
                search: () => ({
                  limit: 50,
                  page: page - 1,
                }),
              })
            }
          />
        )}
      </div>
    </section>
  );
};

export default GuestList;

const GuestListConfig = () => {
  const [_, setFilterParty] = useQueryState('party');
  const [__, setFilterRSVP] = useQueryState('rsvp');
  const [___, setFilterByStatus] = useQueryState('status');

  return (
    <div className="flex flex-col gap-5 border-[#00000014]">
      <div className="flex items-center justify-between">
        <h2 className="leading-[100%] font-medium -tracking-[0.02em] text-[#212121]">
          Guest List
        </h2>
        <p className="leading-[100%] -tracking-[0.02em] text-[#575554]">
          Showing 129 of 1,224
        </p>
      </div>
      <div className="flex justify-between max-sm:flex-col max-sm:gap-4 sm:items-center">
        <div className="relative w-full max-w-70">
          <Input
            name="search"
            type="search"
            className="box-border h-5 border-0 px-7 py-0 leading-[100%] -tracking-[0.02em] shadow-none outline-0 placeholder:text-[#A3A19D] focus-visible:ring-0"
            placeholder="Search guest.."
          />
          <Search className="absolute top-1/2 size-5 -translate-y-1/2 text-[#575554]" />
        </div>
        <div className="flex items-center gap-6 [&>div]:flex [&>div]:items-center [&>div]:gap-1 max-sm:[&>div]:flex-wrap [&>div>p]:leading-[100%] [&>div>p]:-tracking-[0.02em] [&>div>p]:text-[#575554]">
          <div>
            <p>Party:</p>
            <FilterGuestList
              setFilter={setFilterParty}
              placeholder="All"
              options={[
                { value: 'all', label: 'All' },
                { value: 'party', label: 'Party' },
                { value: 'corporate', label: 'Corporate' },
                { value: 'others', label: 'Others' },
              ]}
            />
          </div>
          <div>
            <p>RSVP:</p>
            <FilterGuestList
              setFilter={setFilterRSVP}
              placeholder="All"
              options={[
                { value: 'all', label: 'All' },
                { value: 'party', label: 'Party' },
                { value: 'corporate', label: 'Corporate' },
                { value: 'others', label: 'Others' },
              ]}
            />
          </div>
          <div>
            <p>Status:</p>
            <FilterGuestList
              setFilter={setFilterByStatus}
              placeholder="All"
              options={[
                { value: 'all', label: 'All' },
                { value: 'party', label: 'Party' },
                { value: 'corporate', label: 'Corporate' },
                { value: 'others', label: 'Others' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const GuestCard = ({
  id,
  name,
  party,
  phone,
  email,
  isInviteSent,
  isInviteDelivered,
  isInviteRSVP,
}: Guests) => {
  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });

  const statusTextColor = isInviteSent
    ? 'text-[#0088FF]'
    : // : status === 'pending'
      //   ? 'text-[#FF8D28]'
      isInviteDelivered
      ? 'text-[#2B8309]'
      : 'text-[#6155F5]';

  const statusBgColor = isInviteSent
    ? 'bg-[#0088FF1A]'
    : // : status === 'pending'
      //   ? 'bg-[#FF8D281A]'
      isInviteDelivered
      ? 'bg-[#3FC70A1A]'
      : 'bg-[#6155F51A]';

  const statusBorderColor = isInviteSent
    ? 'border-[#0088FF33]'
    : // : status === 'pending'
      //   ? 'border-[#FF8D2833]'
      isInviteDelivered
      ? 'border-[#3FC70A33]'
      : 'border-[#6155F533]';

  const rsvpTextColor = !isInviteRSVP ? 'text-[#FF8D28]' : 'text-[#2B8309]';

  const rsvpBgColor = !isInviteRSVP ? 'bg-[#FF8D281A]' : 'bg-[#3FC70A1A]';

  const rsvpBorderColor = !isInviteRSVP
    ? 'border-[#FF8D2833]'
    : 'border-[#3FC70A33]';

  return (
    <div className="relative flex flex-col gap-4 text-sm/[100%] -tracking-[0.02em] text-[#575554]">
      <div className="flex flex-col gap-2">
        <Link
          to={'/$eventId'}
          params={{
            eventId,
          }}
          search={{
            guest: id,
            page: 1,
            limit: 50,
          }}
          className="flex items-center justify-between"
        >
          <span className="absolute inset-0"></span>
          <p className="font-medium text-[#222222]">{name}</p>
          <p className="rounded bg-[#F7F5F2] p-1">{party}</p>
        </Link>
        <div className="flex items-center gap-1">
          <p>{phone}</p>
          <span className="flex size-5 items-center justify-center">
            <span className="block size-[4.38px] rounded-full bg-[#575554]"></span>
          </span>
          <p>{email}</p>
        </div>
      </div>
      <hr className="border-y-[0.5px] border-dashed border-[#00000014] bg-transparent" />
      <div className="flex items-center justify-between [&>div]:flex [&>div]:items-center [&>div]:gap-2">
        <div>
          <p>Status</p>
          <p
            className={cn(
              'rounded-[8px] border px-3 py-1.5 capitalize',
              statusTextColor,
              statusBgColor,
              statusBorderColor,
            )}
          >
            {isInviteSent
              ? 'Sent'
              : isInviteDelivered
                ? 'Delivered'
                : 'Pending'}
          </p>
        </div>
        <div>
          <p>RSVP</p>
          <p
            className={cn(
              'rounded-[8px] border px-3 py-1.5 capitalize',
              rsvpTextColor,
              rsvpBgColor,
              rsvpBorderColor,
            )}
          >
            {isInviteRSVP ? 'Confirmed' : 'Awaiting'}
          </p>
        </div>
      </div>
    </div>
  );
};

const FilterGuestList = (props: {
  setFilter: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options | undefined,
  ) => Promise<URLSearchParams>;
  placeholder?: string;
  options: { value: string; label: string }[];
}) => {
  const { setFilter, placeholder, options } = props;

  return (
    <Select onValueChange={setFilter}>
      <SelectTrigger className="h-auto! gap-1 border-0 p-0 [&_svg]:text-[#212121] [&_svg]:opacity-100">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const GuestCardLoading = () => {
  return (
    <div className="relative flex flex-col gap-4 text-sm/[100%] -tracking-[0.02em]">
      {/* Top section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-14 rounded" />
        </div>

        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-24" />
          <span className="flex size-5 items-center justify-center">
            <Skeleton className="size-[4.38px] rounded-full" />
          </span>
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <hr className="border-y-[0.5px] border-dashed border-[#00000014] bg-transparent" />

      {/* Bottom stats */}
      <div className="flex items-center justify-between [&>div]:flex [&>div]:flex-col [&>div]:gap-2">
        <div>
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-7 w-20 rounded-[8px]" />
        </div>

        <div>
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-7 w-24 rounded-[8px]" />
        </div>
      </div>
    </div>
  );
};
