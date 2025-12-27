import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useQueryState, type Options } from 'nuqs';
import DataTable from './data-table';
import { columns } from './columns';
import type { Guests } from '@/lib/constants';

const GuestList = () => {
  const data: Guests[] = [];
  const statuses = ['sent', 'pending', 'delivered', 'seen'] as const;

  for (let i = 0; i < 10; i++) {
    data.push({
      id: i.toString(),
      guest: `Mrs & Mrs Olawale Cole`,
      party: `Groom`,
      contact: {
        phone: `+234 7048099032`,
        email: `bojnuga@gmail.com`,
      },
      status: statuses[Math.floor(Math.random() * statuses.length)],
      rsvp: Math.random() > 0.5 ? 'awaiting' : 'confirmed',
    });
  }

  return (
    <section className="flex flex-col gap-6">
      <GuestListConfig />
      <DataTable data={data} columns={columns} />
    </section>
  );
};

export default GuestList;

const GuestListConfig = () => {
  const [_, setFilterParty] = useQueryState('party');
  const [__, setFilterRSVP] = useQueryState('rsvp');
  const [___, setFilterByStatus] = useQueryState('status');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="leading-[100%] font-medium -tracking-[0.02em] text-[#212121]">
          Guest List
        </h2>
        <p className="leading-[100%] -tracking-[0.02em] text-[#575554]">
          Showing 129 of 1,224
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-70">
          <Input
            name="search"
            type="search"
            className="box-border h-5 border-0 px-7 py-0 leading-[100%] -tracking-[0.02em] shadow-none outline-0 placeholder:text-[#A3A19D] focus-visible:ring-0"
            placeholder="Search guest.."
          />
          <Search className="absolute top-1/2 size-5 -translate-y-1/2 text-[#575554]" />
        </div>
        <div className="flex items-center gap-6 [&>div]:flex [&>div]:items-center [&>div]:gap-1 [&>div>p]:leading-[100%] [&>div>p]:-tracking-[0.02em] [&>div>p]:text-[#575554]">
          <div>
            <p>Party:</p>
            <FilterGuestList
              setFilter={setFilterParty}
              placeholder="All"
              options={[
                { value: 'all', label: 'All' },
                { value: 'party', label: 'Party' },
                { value: 'corporate', label: 'Corporate' },
                { value: 'others', label: 'Others' },
              ]}
            />
          </div>
          <div>
            <p>RSVP:</p>
            <FilterGuestList
              setFilter={setFilterRSVP}
              placeholder="All"
              options={[
                { value: 'all', label: 'All' },
                { value: 'party', label: 'Party' },
                { value: 'corporate', label: 'Corporate' },
                { value: 'others', label: 'Others' },
              ]}
            />
          </div>
          <div>
            <p>Status:</p>
            <FilterGuestList
              setFilter={setFilterByStatus}
              placeholder="All"
              options={[
                { value: 'all', label: 'All' },
                { value: 'party', label: 'Party' },
                { value: 'corporate', label: 'Corporate' },
                { value: 'others', label: 'Others' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterGuestList = (props: {
  setFilter: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options | undefined,
  ) => Promise<URLSearchParams>;
  placeholder?: string;
  options: { value: string; label: string }[];
}) => {
  const { setFilter, placeholder, options } = props;

  return (
    <Select onValueChange={setFilter}>
      <SelectTrigger className="h-auto! gap-1 border-0 p-0 [&_svg]:text-[#212121] [&_svg]:opacity-100">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
