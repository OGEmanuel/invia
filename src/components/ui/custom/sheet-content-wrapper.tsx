import { useSwipe } from '@/lib/hooks/useSwipe';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../sheet';
import { cn } from '@/lib/utils';
import { Button } from '../button';

const SheetContentWrapper = (props: {
  children?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hideHeader?: boolean;
}) => {
  const { children, title, description, className, setOpen, hideHeader } =
    props;
  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useSwipe({
    setOpen,
  });

  return (
    <SheetContent
      side="bottom"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "flex h-167.25 flex-col gap-0 rounded-t-3xl p-0 sm:hidden [&>button_svg:not([class*='size-'])]:size-6",
        className,
      )}
    >
      <SheetHeader
        className={cn(
          'gap-0.5 border-b border-[#00000014] p-4',
          hideHeader && 'sr-only',
        )}
      >
        <SheetTitle className="font-serif text-xl/7 text-[#212121]">
          {title}
        </SheetTitle>
        <SheetDescription
          className={cn(
            'text-sm/5 -tracking-[0.02em] text-[#575554]',
            !description && 'sr-only',
          )}
        >
          {description ?? title}
        </SheetDescription>
      </SheetHeader>
      {children}
    </SheetContent>
  );
};

export default SheetContentWrapper;

export const SheetFooterWrapper = (props: {
  buttonLabel?: string;
  className?: string;
}) => {
  const { className, buttonLabel } = props;

  return (
    <SheetFooter
      className={cn(
        'border-t border-[#00000014] p-4 max-sm:flex-row max-sm:justify-end',
        className,
      )}
    >
      <SheetClose asChild>
        <Button type="button" variant={'neutral'}>
          Cancel
        </Button>
      </SheetClose>

      <Button type={'submit'}>{buttonLabel}</Button>
    </SheetFooter>
  );
};
