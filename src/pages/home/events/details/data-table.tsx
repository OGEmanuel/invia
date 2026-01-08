import TwoPeople from '@/assets/jsx-icons/two-people';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Link, useParams } from '@tanstack/react-router';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { type ReactNode } from 'react';
import SendInvitations from './send-invitations';
import { Send, X } from 'lucide-react';
import { RemoveGuest } from './guest-actions';
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  children?: ReactNode;
  isFirstChildHidden?: boolean;
}

const DataTable = <TData, TValue>(props: DataTableProps<TData, TValue>) => {
  const { columns, data, className, children, isFirstChildHidden } = props;
  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table className={cn(className)}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className="">
              {headerGroup.headers.map(header => {
                const meta = header.column.columnDef.meta as any;
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'h-13 border-b border-[#00000014] text-sm/5 font-medium -tracking-[0.02em] text-[#A3A19D] uppercase first:pl-0',
                      meta?.headerClassName,
                      isFirstChildHidden && 'first:hidden',
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="border-[#EAECF0]">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id} className="relative">
                {row.getVisibleCells().map(cell => {
                  const meta = cell.column.columnDef.meta as any;
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'h-18 border-b border-[#00000014] text-sm/[100%] -tracking-[0.02em] text-[#575554] first:pl-0',
                        meta?.cellClassName,
                        isFirstChildHidden && 'first:hidden',
                      )}
                    >
                      <Link
                        to={`/$eventId`}
                        params={{
                          eventId,
                        }}
                        search={{
                          guest: row.getValue('id') as string,
                          page: 1,
                          limit: 50,
                        }}
                        className="absolute top-1/2 left-1/2 z-10 size-[94%] -translate-1/2"
                      />
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} className="h-24 text-center">
                {children ? children : 'No results.'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div
        className={cn(
          'fixed bottom-8 left-1/2 z-50 flex max-w-180 -translate-x-1/2 translate-y-24 items-center justify-between rounded-4xl bg-[#212121] py-2 pr-2 pl-5 transition-transform ease-in-out max-xl:hidden',
          table.getFilteredSelectedRowModel()?.rows.length > 0 &&
            'animate-appear w-112.5 translate-y-0',
          table.getFilteredSelectedRowModel()?.rows.length === 0 && 'w-full',
        )}
      >
        <div className="flex items-center gap-2">
          <TwoPeople />
          <p className="leading-6 font-medium -tracking-[0.02em] text-white">
            {table.getFilteredSelectedRowModel().rows.length} guest
            {`${table.getFilteredSelectedRowModel().rows.length > 1 ? 's' : ''}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="text-destructive border border-black/8 bg-[#FEFCF9] hover:bg-white"
                variant={'destructive'}
              >
                Remove
              </Button>
            </DialogTrigger>
            <DialogContent className="flex max-w-88.25 flex-col gap-8 rounded-3xl px-4 pt-10 pb-4 sm:max-w-130 [&>button_svg:not([class*='size-'])]:size-6">
              <DialogHeader className="sr-only">
                <DialogTitle>Remove this guest?</DialogTitle>
                <DialogDescription>
                  Removing this guest will delete their details from this event
                  and stop all future messages.
                </DialogDescription>
              </DialogHeader>
              <RemoveGuest
                guestName={
                  table.getFilteredSelectedRowModel()?.rows.length > 1
                    ? `All ${table.getFilteredSelectedRowModel()?.rows.length} guests`
                    : `${table.getFilteredSelectedRowModel()?.rows.length} guest`
                }
                multipleGuests
              />
              <DialogFooter className="flex-row justify-center sm:justify-center">
                <DialogClose asChild>
                  <Button variant="neutral">Go back</Button>
                </DialogClose>
                <Button variant={'destructive'}>
                  Remove guest
                  {table.getFilteredSelectedRowModel()?.rows.length > 1
                    ? 's'
                    : ''}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <SendInvitations className="max-sm:hidden">
            <Button className="max-md:flex-1">
              <Send />
              Send invites
            </Button>
          </SendInvitations>
          <Button
            size={'icon-lg'}
            onClick={() => table.resetRowSelection()}
            className="size-12 border border-black/8 bg-transparent hover:bg-transparent"
          >
            <X />
          </Button>
        </div>
      </div>
    </>
  );
};

export default DataTable;
