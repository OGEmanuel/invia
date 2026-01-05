// 131px is the height of the list config container with the tabs
// 97px is the height of the list config container without the tabs

import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { useQueryState } from 'nuqs';
// import EmptyState from '../../empty-state';
import MainContent from './main-content';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const GuestList = (props: { className?: string }) => {
  const { className } = props;
  return (
    <section
      className={cn(
        '_lg:h-[calc(100vh-137px)] _lg:overflow-auto rounded-[12px] border-black/8 lg:border',
        className,
      )}
    >
      <div className="_pb-4 flex flex-col border-black/8 lg:gap-1 lg:border-b lg:bg-[#F7F5F2] lg:px-4 lg:pt-4">
        <div className="flex flex-col gap-3 max-lg:hidden">
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
      <div>
        <div className="_flex _flex-col _items-center _justify-center h-[calc(100vh-276px)] overflow-auto lg:h-[calc(100vh-270px)]">
          {/* <EmptyState
          header="No guest yet"
          description="No guests have been added yet."
          className="h-max [&>h2]:text-base/6 [&>p]:text-sm/5"
        /> */}
          <MainContent />
        </div>
        <div className="border-t border-black/8 p-5 lg:hidden">
          <Button type="submit" form="add-guest-form" className="h-10 w-full">
            Add (32) guests
          </Button>
        </div>
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
      <TabsList className="px-2 py-4 max-lg:gap-3 max-lg:bg-transparent lg:p-0">
        <TabsTrigger
          value="groom"
          className="rounded-[46px] border-0 border-transparent px-4 py-2 text-sm/5 font-medium -tracking-[0.02em] data-[state=active]:border-[#212121] data-[state=active]:bg-[#212121] data-[state=active]:text-white max-lg:bg-[#F7F5F2] max-lg:text-[#575554] lg:rounded-none lg:border-b-2 lg:px-2 lg:py-3 lg:data-[state=active]:bg-transparent lg:data-[state=active]:text-[#212121]"
        >
          Groom (+2)
        </TabsTrigger>
        <TabsTrigger
          value="bride"
          className="rounded-[46px] border-0 border-transparent px-4 py-2 text-sm/5 font-medium -tracking-[0.02em] data-[state=active]:border-[#212121] data-[state=active]:bg-[#212121] data-[state=active]:text-white max-lg:bg-[#F7F5F2] max-lg:text-[#575554] lg:rounded-none lg:border-b-2 lg:px-2 lg:py-3 lg:data-[state=active]:bg-transparent lg:data-[state=active]:text-[#212121]"
        >
          Bride (+1)
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
