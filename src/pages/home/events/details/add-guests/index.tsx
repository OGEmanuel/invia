// 73px is the height of the navbar

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddGuestForm from './add-guest-form';
import GuestList from './guest-list';
import Navbar from './navbar';
import { cn } from '@/lib/utils';
import { useSearch } from '@tanstack/react-router';
import { useGuestStore } from '@/store/guest-form-store';
import { useQueryState } from 'nuqs';

const AddGuests = () => {
  return (
    <main className="bg-[#FEFCF9]">
      <Navbar />
      <section className="flex justify-center">
        <div className="_max-md:px-5 _md:max-xl:px-8 flex w-full max-w-300 gap-12 pt-5 lg:py-8 lg:max-xl:px-8">
          <AddGuestForm className="basis-full max-lg:hidden" />
          <GuestList className="basis-full max-lg:hidden" />
          <AddGuestMobileTabs className="lg:hidden" />
        </div>
      </section>
    </main>
  );
};

export default AddGuests;

const AddGuestMobileTabs = (props: { className?: string }) => {
  const { className } = props;
  const [mobileTab, setMobileTab] = useQueryState('mobile-add-guest', {
    defaultValue: 'add-guest',
  });
  const { guests: formGuests } = useGuestStore();
  const { guestFilter } = useSearch({
    from: '/_authenticated/$eventId',
  });

  const lengthOfNonEmptyGuests = guestFilter
    ? formGuests.filter(guest => guest.guestName !== '' && guest.party !== '')
        .length
    : formGuests.filter(guest => guest.guestName !== '').length;

  return (
    <Tabs
      className={cn('w-full gap-0', className)}
      defaultValue={mobileTab}
      onValueChange={setMobileTab}
    >
      <TabsList className="w-full rounded-none border-b border-black/8 bg-transparent p-0">
        <TabsTrigger
          value="add-guest"
          className="basis-full rounded-none border-0 border-b-2 border-transparent py-3 text-sm/5 font-medium -tracking-[0.02em] data-[state=active]:border-[#212121] data-[state=active]:bg-transparent data-[state=active]:text-[#212121]"
        >
          Add guest
        </TabsTrigger>
        <TabsTrigger
          value="guest-list"
          className="basis-full rounded-none border-0 border-b-2 border-transparent py-3 text-sm/5 font-medium -tracking-[0.02em] data-[state=active]:border-[#212121] data-[state=active]:bg-transparent data-[state=active]:text-[#212121]"
        >
          Guest list
          {lengthOfNonEmptyGuests > 0 ? `(${lengthOfNonEmptyGuests})` : ''}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="add-guest">
        <AddGuestForm />
      </TabsContent>
      <TabsContent value="guest-list">
        <GuestList />
      </TabsContent>
    </Tabs>
  );
};
