import { Button } from '@/components/ui/button';
import Banner from '../banner';
import StarCalendar from '@/assets/jsx-icons/star-calendar';
import MainContent from './main-content';
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
import CreateEventsForm from './create-events-form';
import CreateEventsMobileSheet from './create-events-mobile-sheet';
import { useFormStore } from '@/store/submitting-store';
import ButtonLoading from '@/components/ui/custom/button-loading';

const Events = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Banner
        header="Manage your events with elegance"
        description="Plan events effortlessly with structured guest lists and seamless invitations."
        className="pt-10 pb-5 md:pt-15 md:pb-18"
      >
        <CreateEventDesktop>
          <Button className="max-sm:hidden [&_svg:not([class*='size-'])]:size-6">
            <StarCalendar />
            Create event
          </Button>
        </CreateEventDesktop>
        <CreateEventsMobileSheet
          open={open}
          onSetOpen={setOpen}
          title="Create new event"
          description="Create an event and manage your guest list."
          className="h-[calc(100%-83px)]"
        >
          <Button className="w-max sm:hidden [&_svg:not([class*='size-'])]:size-6">
            <StarCalendar />
            Create event
          </Button>
        </CreateEventsMobileSheet>
      </Banner>
      <MainContent />
    </>
  );
};

export default Events;

const CreateEventDesktop = (props: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { children } = props;
  const { isFormSubmitting } = useFormStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContentWrapper
        title="Create new event"
        description="Create an event and manage your guest list."
        className="max-sm:hidden"
      >
        <CreateEventsForm onSetOpen={setOpen} className="h-[calc(100%-83px)]">
          <DialogFooter className="border-t border-[#00000014] p-4">
            <DialogClose asChild>
              <Button type="button" variant={'neutral'}>
                Cancel
              </Button>
            </DialogClose>
            <ButtonLoading label="Create event" isPending={isFormSubmitting} />
          </DialogFooter>
        </CreateEventsForm>
      </DialogContentWrapper>
    </Dialog>
  );
};
