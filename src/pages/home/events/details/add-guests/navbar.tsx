import Arrow from '@/assets/jsx-icons/arrow';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Link,
  useLocation,
  useParams,
  useSearch,
} from '@tanstack/react-router';
import { LinkIcon } from 'lucide-react';
import ShareForm from '../../share-events-form';
import ButtonLoading from '@/components/ui/custom/button-loading';
import { useGuestStore } from '@/store/guest-form-store';
import { useFormStore } from '@/store/submitting-store';
import { Activity } from 'react';
import StarCalendar from '@/assets/jsx-icons/star-calendar';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { pathname } = useLocation();
  const { eventId } = useParams({
    from: pathname.includes('/share-guest-list')
      ? '/share-guest-list/$eventId'
      : '/_authenticated/$eventId',
  });
  const { guests: formGuests } = useGuestStore();
  const { guestFilter } = useSearch({
    from: pathname.includes('/share-guest-list')
      ? '/share-guest-list/$eventId'
      : '/_authenticated/$eventId',
  });

  const { isFormSubmitting } = useFormStore();

  const lengthOfNonEmptyGuests = guestFilter
    ? formGuests.filter(guest => guest.guestName !== '' && guest.party !== '')
        .length
    : formGuests.filter(guest => guest.guestName !== '').length;

  return (
    <nav
      className={cn(
        'flex justify-center border-black/8 lg:border-b',
        pathname.includes('/share-guest-list') && 'border-b bg-[#F7F5F2]',
      )}
    >
      <div
        className={cn(
          'flex w-full max-w-7xl items-center justify-between px-4 pt-5 lg:px-8 lg:py-4',
          pathname.includes('/share-guest-list') && 'py-5 lg:py-12.5',
        )}
      >
        <Activity
          mode={pathname.includes('/share-guest-list') ? 'visible' : 'hidden'}
        >
          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-2xl leading-8 text-[#212121] sm:text-[2rem]">
              Mr. & Mrs. Williams' Wedding
            </h1>
            <div className="flex items-center gap-1.5">
              <StarCalendar fill="#A3A19D" />
              <p className="leading-[100%] -tracking-[0.02em] text-[#575554]">
                Sat. Jun 15, 2026
              </p>
            </div>
          </div>
        </Activity>
        <Activity
          mode={pathname.includes('/share-guest-list') ? 'hidden' : 'visible'}
        >
          <div className="flex items-center gap-4">
            <Link
              to={'/$eventId'}
              params={{
                eventId,
              }}
              search={{
                page: 1,
                limit: 50,
              }}
              className="flex size-10 items-center justify-center rounded-full border border-black/8"
            >
              <Arrow />
            </Link>
            <h1 className="font-serif leading-7 text-[#212121] lg:text-xl">
              Add guests
            </h1>
          </div>
        </Activity>
        <div className="flex items-center gap-4">
          <Activity
            mode={pathname.includes('/share-guest-list') ? 'hidden' : 'visible'}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={'neutral'} className="h-10">
                  <LinkIcon className="text-[#6155F5]" />
                  Share form
                </Button>
              </DialogTrigger>
              <DialogContent className="flex max-w-88.25 flex-col gap-8 rounded-3xl bg-white p-6 sm:max-w-130 [&>button_svg:not([class*='size-'])]:size-6">
                <DialogHeader className="sr-only">
                  <DialogTitle>Share guest form</DialogTitle>
                  <DialogDescription>
                    Send the form link and access code for external submissions.
                  </DialogDescription>
                </DialogHeader>
                <ShareForm />
                <DialogFooter className="w-full flex-row">
                  <DialogClose asChild>
                    <Button variant="neutral" className="w-full">
                      Done
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Activity>
          <ButtonLoading
            form="add-guest-form"
            label={`Add ${lengthOfNonEmptyGuests > 0 ? `(${lengthOfNonEmptyGuests})` : ''} guest${lengthOfNonEmptyGuests > 1 ? 's' : ''}`}
            isPending={isFormSubmitting}
            className="h-10 max-lg:hidden"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
