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
import {
  ArrowLeft,
  ChevronDown,
  Link2,
  MoreVertical,
  Send,
} from 'lucide-react';
import EmptyState from './empty-state';

const EventsDetails = () => {
  return (
    <section className="flex min-h-[calc(100vh-326px)] justify-center md:min-h-[calc(100vh-73px)]">
      <div className="font-inter flex w-full max-w-300 flex-col gap-6 max-md:py-5 sm:pt-6">
        <div className="flex flex-col gap-2 max-md:px-5 md:gap-3 md:max-xl:px-8">
          <div className="flex items-center justify-between">
            <Link
              to={'/'}
              className="flex items-center gap-2 leading-[100%] -tracking-[0.02em] text-[#575554]"
            >
              <ArrowLeft className="size-5" />
              Back to events
            </Link>
            <Menu className="lg:hidden" />
          </div>
          <GuestDetails />
        </div>
        <InviteStats />
        <EmptyState />
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
        <Menu className="max-lg:hidden" />
      </div>
    </div>
  );
};

const InviteStats = () => {
  return (
    <div className="scrollbar-hidden max-lg:w-full max-lg:overflow-auto max-md:px-5 md:max-xl:px-8">
      <div className="flex justify-between rounded-[12px] border border-[#0000001A] max-lg:w-max [&>div]:flex [&>div]:flex-col [&>div]:gap-3 [&>div]:border-r [&>div]:border-[#0000001A] [&>div]:p-4 [&>div]:last:border-r-0 max-lg:[&>div]:w-43 lg:[&>div]:basis-full">
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Total guest
          </p>
          <p className="font-serif text-2xl/8 text-[#212121]">0</p>
        </div>
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Invite sent
          </p>
          <p className="font-serif text-2xl/8 text-[#212121]">0</p>
        </div>
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Confirmed RSVP
          </p>
          <p className="font-serif text-2xl/8 text-[#212121]">0</p>
        </div>
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Awaiting Response
          </p>
          <p className="font-serif text-2xl/8 text-[#212121]">0</p>
        </div>
        <div>
          <p className="leading-6 -tracking-[0.02em] text-[#575554]">
            Failed Delivery
          </p>
          <p className="font-serif text-2xl/8 text-[#212121]">0</p>
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
      <DropdownMenuContent
        className="font-inter w-50 rounded-[12px] border-[#1D1D1D0D] p-1 shadow-[0px_16px_16px_0px_#00000008]"
        align="end"
      >
        <DropdownMenuItem className="rounded-[8px] py-2 text-base/6 -tracking-[0.02em] text-[#575554] hover:bg-[#F7F5F2] [&_svg:not([class*='size-'])]:size-5">
          <Person />
          Edit guest
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-between rounded-[8px] text-base/6 -tracking-[0.02em] text-[#575554] hover:bg-[#F7F5F2] [&_svg:not([class*='size-'])]:size-5">
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

const Menu = (props: { className?: string }) => {
  const { className } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button size={'icon-lg'} variant={'neutral'}>
          <MoreVertical className="text-[#575554]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
