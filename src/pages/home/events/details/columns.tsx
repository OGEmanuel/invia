import { Checkbox } from '@/components/ui/checkbox';
import type { Guests } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import GuestActions from './guest-actions';
import { MoreVertical } from 'lucide-react';

export const columns: ColumnDef<Guests>[] = [
  {
    id: 'select',
    accessorKey: 'guest',
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          className="size-3.75 rounded-none border border-[#A3A19D] bg-[#FEFCF9] shadow-none"
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
          className="size-5 rounded-[6px] border border-[#00000014] bg-[#FEFCF9] shadow-none"
          aria-label="Select row"
        />
        <p className="pl-2 font-medium text-[#222222]">{row.original.guest}</p>
      </div>
    ),
  },
  {
    accessorKey: 'party',
    header: 'Party',
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <p>{row.original.contact.phone}</p>
        <p>{row.original.contact.email}</p>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: () => <p className="text-center">Invite Status</p>,
    cell: ({ row }) => {
      const textColor =
        row.original.status === 'sent'
          ? 'text-[#0088FF]'
          : row.original.status === 'pending'
            ? 'text-[#FF8D28]'
            : row.original.status === 'delivered'
              ? 'text-[#2B8309]'
              : 'text-[#6155F5]';

      const bgColor =
        row.original.status === 'sent'
          ? 'bg-[#0088FF1A]'
          : row.original.status === 'pending'
            ? 'bg-[#FF8D281A]'
            : row.original.status === 'delivered'
              ? 'bg-[#3FC70A1A]'
              : 'bg-[#6155F51A]';

      const borderColor =
        row.original.status === 'sent'
          ? 'border-[#0088FF33]'
          : row.original.status === 'pending'
            ? 'border-[#FF8D2833]'
            : row.original.status === 'delivered'
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
            {row.original.status}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'rsvp',
    header: () => <p className="text-center">RSVP</p>,
    cell: ({ row }) => {
      const textColor =
        row.original.rsvp === 'awaiting' ? 'text-[#FF8D28]' : 'text-[#2B8309]';

      const bgColor =
        row.original.rsvp === 'awaiting' ? 'bg-[#FF8D281A]' : 'bg-[#3FC70A1A]';

      const borderColor =
        row.original.rsvp === 'awaiting'
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
            {row.original.rsvp}
          </p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <p className="text-end">Action</p>,
    cell: ({ row }) => {
      const payment = row.original;
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
