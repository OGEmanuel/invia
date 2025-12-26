import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useSwipe } from '@/lib/hooks/useSwipe';
import CreateEventsForm from './create-events-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CreateEventsMobileSheet = (props: {
  children?: React.ReactNode;
  open: boolean;
  onSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
  className?: string;
}) => {
  const { children, open, onSetOpen, title, description, className } = props;
  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useSwipe({
    setOpen: onSetOpen,
  });

  return (
    <Sheet open={open} onOpenChange={onSetOpen}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent
        side="bottom"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex h-167.25 flex-col gap-0 rounded-t-3xl p-0 sm:hidden [&>button_svg:not([class*='size-'])]:size-6"
      >
        <SheetHeader className="gap-0.5 border-b border-[#00000014] p-4">
          <SheetTitle className="font-serif text-xl/7 text-[#212121]">
            {title}
          </SheetTitle>
          {description && (
            <SheetDescription className="font-inter text-sm/5 -tracking-[0.02em] text-[#575554]">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        <CreateEventsForm className={cn('h-[calc(100%-83px)]', className)}>
          <SheetFooter className="border-t border-[#00000014] p-4 max-sm:flex-row max-sm:justify-end">
            <SheetClose asChild>
              <Button
                type="button"
                className="border border-[#00000014] bg-transparent text-[#575554] hover:bg-transparent"
              >
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit">Create event</Button>
          </SheetFooter>
        </CreateEventsForm>
      </SheetContent>
    </Sheet>
  );
};

export default CreateEventsMobileSheet;
