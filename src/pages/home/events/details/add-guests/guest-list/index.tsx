// 131px is the height of the list config container with the tabs
// 97px is the height of the list config container without the tabs

import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { useQueryState } from 'nuqs';
// import EmptyState from '../../empty-state';
import MainContent from './main-content';

const GuestList = () => {
  return (
    <section className="basis-full overflow-hidden rounded-[12px] border border-black/8">
      <div className="_pb-4 flex flex-col gap-1 border-b border-black/8 bg-[#F7F5F2] px-4 pt-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl/7 text-[#212121]">Guest List</h2>
            <p className="text-sm/5 font-medium -tracking-[0.02em] text-[#575554]">
              {/* No guest yet */}
              10 guests
            </p>
          </div>
          <div className="relative w-full">
            <Input
              name="search"
              type="search"
              className="box-border h-5 border-0 px-7 py-0 leading-[100%] -tracking-[0.02em] shadow-none outline-0 placeholder:text-[#A3A19D] focus-visible:ring-0"
              placeholder="Search guest.."
            />
            <Search className="absolute top-1/2 size-5 -translate-y-1/2 text-[#A3A19D]" />
          </div>
        </div>
        <GuestTabs />
      </div>
      <div className="_h-[calc(100%-97px)] _flex _flex-col _items-center _justify-center h-[calc(100%-131px)] overflow-auto">
        {/* <EmptyState
          header="No guest yet"
          description="No guests have been added yet."
          className="h-max [&>h2]:text-base/6 [&>p]:text-sm/5"
        /> */}
        <MainContent />
      </div>
    </section>
  );
};

export default GuestList;

const GuestTabs = () => {
  const [filterParty, setFilterParty] = useQueryState('party', {
    defaultValue: 'groom',
  });

  return (
    <Tabs value={filterParty} onValueChange={setFilterParty} className="w-max">
      <TabsList className="p-0">
        <TabsTrigger
          value="groom"
          className="rounded-none border-0 border-b-2 border-transparent px-2 py-3 text-sm/5 font-medium -tracking-[0.02em] data-[state=active]:border-[#212121] data-[state=active]:bg-transparent data-[state=active]:text-[#212121]"
        >
          Groom (+2)
        </TabsTrigger>
        <TabsTrigger
          value="bride"
          className="rounded-none border-0 border-b-2 border-transparent px-2 py-3 text-sm/5 font-medium -tracking-[0.02em] data-[state=active]:border-[#212121] data-[state=active]:bg-transparent data-[state=active]:text-[#212121]"
        >
          Bride (+1)
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
