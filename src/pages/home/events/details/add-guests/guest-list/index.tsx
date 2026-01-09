// 131px is the height of the list config container with the tabs
// 97px is the height of the list config container without the tabs

import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import EmptyState from '../../empty-state';
import MainContent from './main-content';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useGuestStore } from '@/store/guest-form-store';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { useGetEventParties, useGetGuests } from '@/lib/queries/hooks';
import type { GuestData, Party } from '@/lib/constants';
import Skeleton from '@/components/ui/custom/skeleton';
import { Activity, useEffect } from 'react';
import NotFound from '@/pages/not-found';

const GuestList = (props: { className?: string }) => {
  const { className } = props;

  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });
  const { data, isError } = useGetEventParties(eventId);
  const { guestFilter } = useSearch({
    from: '/_authenticated/$eventId',
  });
  const { data: guestsData, isError: guestsIsError } = useGetGuests(
    1,
    50,
    eventId,
  );
  const { guests: formGuests } = useGuestStore();

  const areAllEmpty = guestFilter
    ? formGuests.every(guest => !guest.guestName || !guest.party)
    : formGuests.every(guest => !guest.guestName);

  const lengthOfPartyGuests = formGuests.filter(
    guest => guest.party === guestFilter,
  ).length;

  const lengthOfNonEmptyGuests = guestFilter
    ? formGuests.filter(guest => guest.guestName !== '' && guest.party !== '')
        .length
    : formGuests.filter(guest => guest.guestName !== '').length;

  const guests: GuestData = guestsData?.data;

  const parties: Party[] = data?.data;

  return (
    <section
      className={cn('h-max rounded-[12px] border-black/8 lg:border', className)}
    >
      <div
        className={cn(
          'flex flex-col border-black/8 lg:gap-1 lg:border-b lg:bg-[#F7F5F2] lg:px-4 lg:pt-4',
          (isError || parties?.length < 1) && 'pb-4',
        )}
      >
        <div className="flex flex-col gap-3 max-lg:hidden">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl/7 text-[#212121]">Guest List</h2>
            <Activity mode={guests?.guests ? 'visible' : 'hidden'}>
              <p className="text-sm/5 font-medium -tracking-[0.02em] text-[#575554]">
                {guests?.guests?.length < 1 && lengthOfNonEmptyGuests < 1
                  ? 'No guest yet'
                  : `${guests?.guests?.length} ${lengthOfNonEmptyGuests > 0 ? `+ ${lengthOfNonEmptyGuests}` : ''}
                guest${
                  lengthOfNonEmptyGuests > 1 || guests?.guests?.length > 1
                    ? 's'
                    : ''
                }
                `}
              </p>
            </Activity>
          </div>
          <div className="relative w-full">
            <Input
              name="search"
              type="search"
              className="box-border h-5 border-0 px-7 py-0 leading-[100%] -tracking-[0.02em] shadow-none outline-0 placeholder:text-[#A3A19D] focus-visible:ring-0"
              placeholder="Search guest.."
            />
            <Search className="absolute top-1/2 size-5 -translate-y-1/2 text-[#A3A19D]" />
          </div>
        </div>
        <GuestTabs />
      </div>
      <div
        className={cn(
          'h-[calc(100vh-276px)] overflow-auto lg:h-[calc(100vh-270px)]',
          ((guests?.guests.length < 1 && areAllEmpty) ||
            (guests?.guests.length < 1 &&
              guestFilter &&
              lengthOfPartyGuests < 1)) &&
            'flex flex-col items-center justify-center',
        )}
      >
        <Activity mode={guestsIsError ? 'visible' : 'hidden'}>
          <NotFound
            header="Unable to fetch guests"
            description="Check your internet connection and try againg or contact our support team for more."
          />
        </Activity>
        <Activity mode={guestsIsError ? 'hidden' : 'visible'}>
          {(guests?.guests.length < 1 && areAllEmpty) ||
          (guests?.guests.length < 1 &&
            guestFilter &&
            lengthOfPartyGuests < 1) ? (
            <EmptyState
              header="No guest yet"
              description="No guests have been added yet."
              className="h-max [&>h2]:text-base/6 [&>p]:text-sm/5"
            />
          ) : (
            <MainContent />
          )}
        </Activity>
      </div>
      <div className="border-t border-black/8 p-5 lg:hidden">
        <Button type="submit" form="add-guest-form" className="h-10 w-full">
          Add (32) guests
        </Button>
      </div>
    </section>
  );
};

export default GuestList;

const GuestTabs = () => {
  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });
  const { guestFilter } = useSearch({
    from: '/_authenticated/$eventId',
  });
  const navigate = useNavigate({ from: '/$eventId' });
  const { data, isPending, isError } = useGetEventParties(eventId);
  const parties: Party[] = data?.data;
  const { guests: formGuests } = useGuestStore();

  const filterPartyGuestsLength = (partyId: string) => {
    return formGuests.filter(guest => guest.party === partyId).length;
  };

  useEffect(() => {
    if (parties?.length > 0) {
      navigate({
        to: '/$eventId',
        search: {
          addGuest: true,
          guestFilter: parties[0].id,
          page: 1,
          limit: 50,
        },
        replace: true,
      });
    } else {
      navigate({
        to: '/$eventId',
        search: {
          addGuest: true,
          page: 1,
          limit: 50,
        },
        replace: true,
      });
    }
  }, [parties]);

  if (isPending) {
    return <GuestTabsLoading />;
  }

  return (
    <Tabs
      value={guestFilter ?? ''}
      onValueChange={value =>
        navigate({
          search: { guestFilter: value, page: 1, limit: 50, addGuest: true },
        })
      }
      className={cn('w-max', (isError || parties?.length < 1) && 'hidden')}
    >
      <TabsList className="px-2 py-4 max-lg:gap-3 max-lg:bg-transparent lg:p-0">
        {parties.map(party => (
          <TabsTrigger
            key={party.id}
            value={party.id}
            className="rounded-[46px] border-0 border-transparent px-4 py-2 text-sm/5 font-medium -tracking-[0.02em] data-[state=active]:border-[#212121] data-[state=active]:bg-[#212121] data-[state=active]:text-white max-lg:bg-[#F7F5F2] max-lg:text-[#575554] lg:rounded-none lg:border-b-2 lg:px-2 lg:py-3 lg:data-[state=active]:bg-transparent lg:data-[state=active]:text-[#212121]"
          >
            {party.name}{' '}
            {filterPartyGuestsLength(party.id) > 0
              ? `+ ${filterPartyGuestsLength(party.id)}`
              : ''}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

const GuestTabsLoading = () => {
  return (
    <div className="w-max">
      <div className="flex px-2 py-4 max-lg:gap-3 lg:p-0">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[46px] px-4 py-2 max-lg:bg-[#F7F5F2] lg:rounded-none lg:px-2 lg:py-3"
          >
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};
