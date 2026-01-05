// 73px is the height of the navbar

import AddGuestForm from './add-guest-form';
import GuestList from './guest-list';
import Navbar from './navbar';

const AddGuests = () => {
  return (
    <main className="bg-[#FEFCF9]">
      <Navbar />
      <section className="flex justify-center">
        <div className="flex h-[calc(100vh-73px)] w-full max-w-300 gap-12 py-8">
          <AddGuestForm className="basis-full" />
          <GuestList />
        </div>
      </section>
    </main>
  );
};

export default AddGuests;
