import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  children?: ReactNode;
}

const DataTable = <TData, TValue>(props: DataTableProps<TData, TValue>) => {
  const { columns, data, className, children } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => {
                const meta = cell.column.columnDef.meta as any;
                return (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      'h-18 border-b border-[#00000014] text-sm/[100%] -tracking-[0.02em] text-[#575554] first:pl-0',
                      meta?.cellClassName,
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};

export default DataTable;
