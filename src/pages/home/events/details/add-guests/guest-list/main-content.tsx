import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import GuestActions from '../../guest-actions';
import { useGuestStore } from '@/store/guest-form-store';
import type { GuestData } from '@/lib/constants';
import { useGetGuests } from '@/lib/queries/hooks';
import { useParams, useSearch } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import Skeleton from '@/components/ui/custom/skeleton';

const MainContent = () => {
  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });
  const { guests } = useGuestStore();
  const { guestFilter } = useSearch({
    from: '/_authenticated/$eventId',
  });

  const displayedList = guestFilter
    ? guests.filter(
        guest => guest?.party?.toLowerCase() === guestFilter.toLowerCase(),
      )
    : guests;

  const { data: guestsData, isPending } = useGetGuests(1, 50, eventId);
  const guestsList: GuestData = guestsData?.data;

  return (
    <div className="flex flex-col gap-3 p-4">
      {displayedList.map((guest, i) => (
        <GuestCard
          key={i}
          guestName={guest.guestName}
          whatsappNumber={guest.whatsappNumber}
          email={guest.email}
        />
      ))}
      {isPending
        ? Array(10)
            .fill(0)
            .map((_, i) => <GuestListItemLoading key={i} />)
        : guestsList.guests.map(guest => (
            <GuestCard
              key={guest.id}
              guestName={guest.name}
              whatsappNumber={guest.phone}
              email={guest.email}
              sent
            />
          ))}
    </div>
  );
};

export default MainContent;

const GuestCard = (props: {
  guestName: string;
  whatsappNumber: string;
  email?: string;
  sent?: boolean;
}) => {
  const { guestName, whatsappNumber, email, sent } = props;

  const allEmpty = guestName === '' && whatsappNumber === '' && !email;

  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-dashed border-black/8 pb-3 last:border-b-0',
        allEmpty && 'hidden',
      )}
    >
      <div className="flex flex-col gap-0.5">
        {guestName !== '' && (
          <p className="text-sm/5 font-medium -tracking-[0.02em] text-[#212121]">
            {guestName}
          </p>
        )}
        <div className="flex items-center text-sm/5 -tracking-[0.02em] text-[#575554]">
          {whatsappNumber !== '' && <p>{whatsappNumber}</p>}
          {email && whatsappNumber !== '' && (
            <span className="flex size-5 items-center justify-center">
              <span className="block size-[2.5px] rounded-full bg-black"></span>
            </span>
          )}
          {email && <p>{email}</p>}
        </div>
      </div>
      {sent && (
        <GuestActions asChild>
          <Button
            className="size-5 rounded-none"
            variant={'ghost'}
            size={'icon'}
          >
            <MoreVertical className="size-5 text-[#575554]" />
          </Button>
        </GuestActions>
      )}
    </div>
  );
};

const GuestListItemLoading = () => {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-black/8 pb-3 last:border-b-0">
      {/* Left content */}
      <div className="flex flex-col gap-0.5">
        <Skeleton className="h-4 w-32" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <span className="flex size-5 items-center justify-center">
            <Skeleton className="size-[2.5px] rounded-full" />
          </span>
          <Skeleton className="h-4 w-36" />
        </div>
      </div>

      {/* Right action */}
      <Skeleton className="size-5 rounded-sm" />
    </div>
  );
};
