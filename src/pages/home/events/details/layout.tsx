//73px is the height of the navbar
//326px is the height of the navbar + the height of the banner for mobile

import { Link, useParams, useSearch } from '@tanstack/react-router';
import {
  ArrowLeft,
  ChevronDown,
  Link2,
  MoreVertical,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Person from '@/assets/jsx-icons/person';
import Premium from '@/assets/jsx-icons/premium';
import GuestActions from './guest-actions';
import EventMenuDropdownDialog from './event-menu-dropdown-dialog';
import SendInvitations, {
  SendInvitationsMobileSheet,
} from './send-invitations';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ScrollToTop from '@/components/scroll-to-top';
import ShareForm from '../share-events-form';
import { useGetEventParties } from '@/lib/queries/hooks';
import type { Party } from '@/lib/constants';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS } from '@/lib/queries';
import { startPasscodeAutoRefresh } from '@/services/passcodeController';

const EventDetailsLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });
  const { mutate } = useSendRequest<
    { eventId: string },
    { data: { passcode: string; passcodeExpires: string } }
  >({
    mutationFn: (data: { eventId: string }) =>
      MUTATIONS.getEventShareFormGeneratePasscode(data.eventId),
    errorToast: {
      title: 'Failed!',
      description: 'Share code generation failed!',
    },
  });

  useEffect(() => {
    startPasscodeAutoRefresh(eventId, mutate);
  }, [eventId, mutate]);
  return (
    <>
      <ScrollToTop />
      <section className="flex min-h-[calc(100vh-326px)] justify-center md:min-h-[calc(100vh-73px)]">
        <div className="flex w-full max-w-300 flex-col gap-6 max-md:py-5 sm:pt-6">
          {children}
        </div>
      </section>
    </>
  );
};

export default EventDetailsLayout;

export const EventDetailsLayoutHeader = (props: {
  children?: React.ReactNode;
  link: string;
  linkLabel: string;
  eventId?: string;
}) => {
  const { guest } = useSearch({
    from: '/_authenticated/$eventId',
  });

  const { children, link, linkLabel, eventId } = props;
  return (
    <div className="flex flex-col gap-2 max-md:px-5 md:gap-3 md:max-xl:px-8">
      <div className="flex items-center justify-between">
        <Link
          to={link}
          params={{
            eventId: eventId ?? undefined,
          }}
          className="flex items-center gap-2 leading-[100%] -tracking-[0.02em] text-[#575554]"
        >
          <ArrowLeft className="size-5" />
          {linkLabel}
        </Link>
        {guest ? (
          <GuestActions asChild className="lg:hidden">
            <Button size={'icon-lg'} variant={'neutral'}>
              <MoreVertical className="text-[#575554]" />
            </Button>
          </GuestActions>
        ) : (
          <EventMenuDropdownDialog className="lg:hidden" />
        )}
      </div>
      {children}
    </div>
  );
};

export const GuestDetails = (props: {
  header: string;
  children: React.ReactNode;
}) => {
  const { guest } = useSearch({
    from: '/_authenticated/$eventId',
  });

  const { header, children } = props;

  const [open, setOpen] = useState(false);
  return (
    <div className="flex max-lg:flex-col max-lg:gap-6 md:justify-between lg:items-center">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-2xl/8 text-[#212121]">{header}</h1>
        {children}
      </div>
      <div className="flex items-center gap-2 md:max-lg:justify-end">
        {!guest && <AddGuest className="max-md:flex-1" />}
        {guest ? (
          <>
            <SendInvitations className="max-sm:hidden">
              <Button className="max-md:flex-1">
                <Send />
                Send invite
              </Button>
            </SendInvitations>
            <SendInvitationsMobileSheet
              open={open}
              onSetOpen={setOpen}
              className="sm:hidden"
            >
              <Button className="max-md:flex-1">
                <Send />
                Send invite
              </Button>
            </SendInvitationsMobileSheet>
          </>
        ) : (
          <>
            <SendInvitations className="max-sm:hidden">
              <Button className="max-md:flex-1">
                <Send />
                Send invites
              </Button>
            </SendInvitations>
            <SendInvitationsMobileSheet
              open={open}
              onSetOpen={setOpen}
              className="sm:hidden"
            >
              <Button className="max-md:flex-1">
                <Send />
                Send invites
              </Button>
            </SendInvitationsMobileSheet>
          </>
        )}
        {guest ? (
          <GuestActions asChild className="max-lg:hidden">
            <Button size={'icon-lg'} variant={'neutral'}>
              <MoreVertical className="text-[#575554]" />
            </Button>
          </GuestActions>
        ) : (
          <EventMenuDropdownDialog className="max-lg:hidden" />
        )}
      </div>
    </div>
  );
};

const AddGuest = (props: { className?: string }) => {
  const { className } = props;
  const [open, setOpen] = useState(false);
  const [showShareFormDialog, setShowShareFormDialog] = useState(false);
  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });

  const { data } = useGetEventParties(eventId);
  const parties: Party[] = data?.data;

  return (
    <>
      <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild className={className}>
          <Button
            variant={'neutral'}
            className="gap-2 [&_svg:not([class*='size-'])]:size-6"
          >
            <Person />
            Add guest
            <ChevronDown className="size-5 text-[#A3A19D]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild onSelect={() => setOpen(false)}>
            <Link
              to="/$eventId"
              params={{
                eventId,
              }}
              search={{
                addGuest: true,
                page: 1,
                limit: 50,
                guestFilter:
                  parties?.length > 0
                    ? parties[0].name.toLowerCase()
                    : undefined,
              }}
              className="absolute inset-0"
            >
              <Person />
              Add guest
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="justify-between"
            onSelect={() => setShowShareFormDialog(true)}
          >
            <span className="flex items-center gap-2">
              <Link2 className="-rotate-45 text-[#575554]" />
              Share form
            </span>
            <Premium />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showShareFormDialog} onOpenChange={setShowShareFormDialog}>
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
    </>
  );
};
