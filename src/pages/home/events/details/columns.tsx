import { Checkbox } from '@/components/ui/checkbox';
import type { Guests } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import GuestActions from './guest-actions';
import { MoreVertical } from 'lucide-react';
import Skeleton from '@/components/ui/custom/skeleton';

export const columns: ColumnDef<Guests>[] = [
  {
    accessorKey: 'id',
    header: () => null,
  },
  {
    id: 'select',
    accessorKey: 'name',
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          className="z-10 size-5 rounded-[6px] border border-black/8 shadow-none data-[state=checked]:border-[#6155F5] data-[state=checked]:bg-[#F9F5FF] data-[state=indeterminate]:border-[#6155F5] data-[state=indeterminate]:bg-[#F9F5FF]"
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <div className="pl-2">Guest</div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          className="z-10 size-5 rounded-[6px] border border-black/8 bg-[#FEFCF9] shadow-none data-[state=checked]:border-[#6155F5] data-[state=checked]:bg-[#F9F5FF] data-[state=indeterminate]:border-[#6155F5] data-[state=indeterminate]:bg-[#F9F5FF]"
          aria-label="Select row"
        />
        <p className="pl-2 font-medium text-[#222222]">{row.original.name}</p>
      </div>
    ),
  },
  {
    accessorKey: 'party',
    header: 'Party',
  },
  {
    accessorKey: 'phone',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <p>{row.original.phone}</p>
        <p>{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: 'isInviteSent',
    header: () => <p className="text-center">Invite Status</p>,
    cell: ({ row }) => {
      const textColor = row.original.isInviteSent
        ? 'text-[#0088FF]'
        : row.original.isInviteRSVP
          ? 'text-[#FF8D28]'
          : row.original.isInviteDelivered
            ? 'text-[#2B8309]'
            : 'text-[#6155F5]';

      const bgColor = row.original.isInviteSent
        ? 'bg-[#0088FF1A]'
        : // : row.original.isInviteRSVP
          //   ? 'bg-[#FF8D281A]'
          row.original.isInviteDelivered
          ? 'bg-[#3FC70A1A]'
          : 'bg-[#6155F51A]';

      const borderColor = row.original.isInviteSent
        ? 'border-[#0088FF33]'
        : // : row.original.isInviteRSVP
          //   ? 'border-[#FF8D2833]'
          row.original.isInviteDelivered
          ? 'border-[#3FC70A33]'
          : 'border-[#6155F533]';

      return (
        <div className="flex justify-center">
          <p
            className={cn(
              'w-max rounded-[8px] border px-3 py-1.5 text-center text-sm/[100%] font-medium -tracking-[0.02em] capitalize',
              textColor,
              bgColor,
              borderColor,
            )}
          >
            {row.original.isInviteSent
              ? 'Sent'
              : row.original.isInviteDelivered
                ? 'Delivered'
                : 'Pending'}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'isInviteRSVP',
    header: () => <p className="text-center">RSVP</p>,
    cell: ({ row }) => {
      const textColor = !row.original.isInviteRSVP
        ? 'text-[#FF8D28]'
        : 'text-[#2B8309]';

      const bgColor = !row.original.isInviteRSVP
        ? 'bg-[#FF8D281A]'
        : 'bg-[#3FC70A1A]';

      const borderColor = !row.original.isInviteRSVP
        ? 'border-[#FF8D2833]'
        : 'border-[#3FC70A33]';

      return (
        <div className="flex justify-center">
          <p
            className={cn(
              'w-max rounded-[8px] border px-3 py-1.5 text-center text-sm/[100%] font-medium -tracking-[0.02em] capitalize',
              textColor,
              bgColor,
              borderColor,
            )}
          >
            {row.original.isInviteRSVP ? 'Confirmed' : 'Awaiting'}
          </p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <p className="text-end">Action</p>,
    cell: () => {
      return (
        <div className="flex justify-end">
          <GuestActions>
            <MoreVertical className="size-5 text-[#5B5B5B]" />
          </GuestActions>
        </div>
      );
    },
  },
];

export const columnsSkeleton: ColumnDef<Guests>[] = [
  {
    accessorKey: 'id',
    header: () => null,
  },
  {
    id: 'select',
    accessorKey: 'name',
    header: () => (
      <div className="flex items-center">
        <Skeleton className="size-5 rounded-[6px]" />
        <div className="pl-2">Guest</div>
      </div>
    ),
    cell: () => (
      <div className="flex items-center">
        <Skeleton className="size-5 rounded-[6px]" />
        <Skeleton className="ml-2 h-4 w-32" />
      </div>
    ),
  },
  {
    accessorKey: 'party',
    header: 'Party',
    cell: () => <Skeleton className="h-4 w-20" />,
  },
  {
    accessorKey: 'phone',
    header: 'Contact',
    cell: () => (
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-36" />
      </div>
    ),
  },
  {
    accessorKey: 'isInviteSent',
    header: () => <p className="text-center">Invite Status</p>,
    cell: () => {
      return (
        <div className="flex justify-center">
          <Skeleton className="h-7 w-20 rounded-[8px]" />
        </div>
      );
    },
  },
  {
    accessorKey: 'isInviteRSVP',
    header: () => <p className="text-center">RSVP</p>,
    cell: () => {
      return (
        <div className="flex justify-center">
          <Skeleton className="h-7 w-24 rounded-[8px]" />
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <p className="text-end">Action</p>,
    cell: () => {
      return (
        <div className="flex justify-end">
          <Skeleton className="size-5 rounded-full" />
        </div>
      );
    },
  },
];
