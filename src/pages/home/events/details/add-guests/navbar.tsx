import Arrow from '@/assets/jsx-icons/arrow';
import { Button } from '@/components/ui/button';
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
import { Link, useParams } from '@tanstack/react-router';
import { LinkIcon } from 'lucide-react';
import ShareForm from '../../share-events-form';

const Navbar = () => {
  const { eventId } = useParams({
    from: '/$eventId',
  });

  return (
    <nav className="flex justify-center border-b border-black/8">
      <div className="flex w-full max-w-7xl items-center justify-between px-8 py-4">
        <div className="flex items-center gap-4">
          <Link
            to={'/$eventId'}
            params={{
              eventId,
            }}
            className="flex size-10 items-center justify-center rounded-full border border-black/8"
          >
            <Arrow />
          </Link>
          <h1 className="font-serif text-xl/7 text-[#212121]">Add guests</h1>
        </div>
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger>
              <Button variant={'neutral'} className="h-10">
                <LinkIcon className="text-[#6155F5]" />
                Share form
              </Button>
            </DialogTrigger>
            <DialogContent className="flex max-w-88.25 flex-col gap-8 rounded-3xl bg-white p-6 sm:max-w-130 [&>button_svg:not([class*='size-'])]:size-6">
              <DialogHeader className="sr-only">
                <DialogTitle>Share guest form</DialogTitle>
                <DialogDescription>
                  Send the form link and access code for external submissions.
                </DialogDescription>
              </DialogHeader>
              <ShareForm />
              <DialogFooter className="w-full flex-row">
                <DialogClose asChild>
                  <Button variant="neutral" className="w-full">
                    Done
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button className="h-10">Add Guests</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
