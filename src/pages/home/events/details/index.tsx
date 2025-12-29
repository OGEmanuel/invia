//73px is the height of the navbar
//326px is the height of the navbar + the height of the banner for mobile

import Person from '@/assets/jsx-icons/person';
import Premium from '@/assets/jsx-icons/premium';
import StarCalendar from '@/assets/jsx-icons/star-calendar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, ChevronDown, Link2, Send } from 'lucide-react';
// import EmptyState from './empty-state';
import MenuDropdownDialog from './menu-dropdown-dialog';
import { cn } from '@/lib/utils';
import GuestList from './guest-list';

const EventsDetails = () => {
  return (
    <section className="flex min-h-[calc(100vh-326px)] justify-center md:min-h-[calc(100vh-73px)]">
      <div className="flex w-full max-w-300 flex-col gap-6 max-md:py-5 sm:pt-6">
        <div className="flex flex-col gap-2 max-md:px-5 md:gap-3 md:max-xl:px-8">
          <div className="flex items-center justify-between">
            <Link
              to={'/'}
              className="flex items-center gap-2 leading-[100%] -tracking-[0.02em] text-[#575554]"
            >
              <ArrowLeft className="size-5" />
              Back to events
            </Link>
            <MenuDropdownDialog className="lg:hidden" />
          </div>
          <GuestDetails />
        </div>
        <InviteStats />
        {/* <EmptyState /> */}
        <GuestList />
      </div>
    </section>
  );
};

export default EventsDetails;

const GuestDetails = () => {
  return (
    <div className="flex max-lg:flex-col max-lg:gap-6 md:justify-between lg:items-center">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-2xl/8 text-[#212121]">
          Mr. & Mrs. Williams' Wedding
        </h1>
        <div className="flex items-center gap-1.5">
          <StarCalendar fill="#A3A19D" />
          <p className="leading-[100%] -tracking-[0.02em] text-[#575554]">
            Sat. Jun 15, 2026
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 md:max-lg:justify-end">
        <AddGuest className="max-md:flex-1" />
        <Button className="max-md:flex-1">
          <Send />
          Send invites
        </Button>
        <MenuDropdownDialog className="max-lg:hidden" />
      </div>
    </div>
  );
};

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

const AddGuest = (props: { className?: string }) => {
  const { className } = props;

  return (
    <DropdownMenu>
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
        <DropdownMenuItem className="justify-between">
          <span className="flex items-center gap-2">
            <Link2 className="-rotate-45 text-[#575554]" />
            Share form
          </span>
          <Premium />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
