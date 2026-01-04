//73px is the height of the navbar
//326px is the height of the navbar + the height of the banner for mobile

import { Link, useSearch } from '@tanstack/react-router';
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
import { useReducer, useRef, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ShareFormIcon from '@/assets/jsx-icons/share-form';
import { FieldDescription, FieldGroup, FieldSet } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Refresh from '@/assets/jsx-icons/refresh';

const EventDetailsLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <section className="flex min-h-[calc(100vh-326px)] justify-center md:min-h-[calc(100vh-73px)]">
      <div className="flex w-full max-w-300 flex-col gap-6 max-md:py-5 sm:pt-6">
        {children}
      </div>
    </section>
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
    from: '/$eventId',
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
    from: '/$eventId',
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
  const [showShareFormDialog, setShowShareFormDialog] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
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
          <DropdownMenuItem>
            <Person />
            Add guest
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

type CopyType = 'link' | 'code' | null;

type CopyState = {
  copied: CopyType;
};

type CopyAction = { type: 'COPY'; payload: CopyType } | { type: 'RESET' };

const copyReducer = (state: CopyState, action: CopyAction): CopyState => {
  switch (action.type) {
    case 'COPY':
      return { copied: action.payload };

    case 'RESET':
      return { copied: null };

    default:
      return state;
  }
};

const ShareForm = () => {
  const [state, dispatch] = useReducer(copyReducer, { copied: null });
  const timeoutRef = useRef<number | null>(null);

  const handleCopy = async (text: string, type: 'link' | 'code') => {
    try {
      await navigator.clipboard.writeText(text);

      dispatch({ type: 'COPY', payload: type });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => {
        dispatch({ type: 'RESET' });
      }, 1000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center">
        <ShareFormIcon />
        <div className="flex w-full max-w-100 flex-col gap-1 text-center">
          <h3 className="font-serif text-xl/7 text-[#212121]">
            Share guest form
          </h3>
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
            Send the form link and access code for external submissions.
          </p>
        </div>
      </div>
      <FieldGroup className="gap-1.5">
        <Label
          htmlFor="formLink"
          className="text-sm/5 font-medium -tracking-[0.02em] text-[#575554]"
        >
          Form Link
        </Label>
        <FieldSet className="flex-row items-center gap-2">
          <Input
            id="formLink"
            name="formLink"
            value={
              'https://preview-cccc35a7--invitejoy-bot.lovable.app/guest-form/1'
            }
            disabled
            className="h-10 rounded-[12px] border border-black/8 bg-[#FEFCF9] px-3.5 text-ellipsis text-[#212121] shadow-none disabled:opacity-100"
          />
          <Button
            className="h-10 w-24 text-sm/[22px] font-medium -tracking-[0.02em] text-[#479FFD]"
            variant={'neutral'}
            onClick={() =>
              handleCopy(
                'https://preview-cccc35a7--invitejoy-bot.lovable.app/guest-form/1',
                'link',
              )
            }
          >
            {state.copied === 'link' ? 'Copied!' : 'Copy link'}
          </Button>
        </FieldSet>
      </FieldGroup>
      <FieldGroup className="gap-1.5">
        <Label
          htmlFor="formCode"
          className="text-sm/5 font-medium -tracking-[0.02em] text-[#575554]"
        >
          Access Passcode
        </Label>
        <FieldSet className="flex-row items-center gap-2">
          <Input
            id="formCode"
            name="formCode"
            value={'6AHPCE'}
            disabled
            className="h-10 rounded-[12px] border border-black/8 bg-[#FEFCF9] px-3.5 text-ellipsis text-[#212121] shadow-none disabled:opacity-100"
          />
          <Button
            size={'icon'}
            variant={'neutral'}
            className="size-10 rounded-[12px] px-2 [&_svg:not([class*='size-'])]:size-6"
          >
            <Refresh />
          </Button>
          <Button
            className="h-10 w-24 text-sm/[22px] font-medium -tracking-[0.02em] text-[#479FFD]"
            variant={'neutral'}
            onClick={() => handleCopy('6AHPCE', 'code')}
          >
            {state.copied === 'code' ? 'Copied!' : 'Copy Code'}
          </Button>
        </FieldSet>
        <FieldDescription className="text-sm/5 -tracking-[0.02em] text-[#575554]">
          Your client will need this passcode to access the form
        </FieldDescription>
      </FieldGroup>
      <ul className="list-inside list-disc rounded-3xl bg-[#F7F5F2] px-4 py-3 text-xs leading-6 -tracking-[0.02em] text-[#575554] sm:text-sm">
        <li>Share the form link with your client</li>
        <li>Provide them with the passcode above</li>
        <li>They can add guests directly to your event</li>
        <li>Reset the passcode anytime for security</li>
      </ul>
    </div>
  );
};
