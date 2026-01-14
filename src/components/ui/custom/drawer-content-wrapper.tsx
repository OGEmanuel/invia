import { cn } from '@/lib/utils';
import { Button } from '../button';
import ButtonLoading from './button-loading';
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../drawer';

const DrawerContentWrapper = (props: {
  children?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  hideHeader?: boolean;
}) => {
  const { children, title, description, className, hideHeader } = props;

  return (
    <DrawerContent
      className={cn(
        "flex h-167.25 flex-col gap-0 rounded-t-3xl p-0 sm:hidden [&>button_svg:not([class*='size-'])]:size-6",
        className,
      )}
    >
      <DrawerHeader
        className={cn(
          'gap-0.5 border-b border-[#00000014] p-4 text-start!',
          hideHeader && 'sr-only',
        )}
      >
        <DrawerTitle className="font-serif text-xl/7 text-[#212121]">
          {title}
        </DrawerTitle>
        <DrawerDescription
          className={cn(
            'text-sm/5 -tracking-[0.02em] text-[#575554]',
            !description && 'sr-only',
          )}
        >
          {description ?? title}
        </DrawerDescription>
      </DrawerHeader>
      {children}
    </DrawerContent>
  );
};

export default DrawerContentWrapper;

export const DrawerFooterWrapper = (props: {
  buttonLabel: string;
  className?: string;
  isPending?: boolean;
}) => {
  const { className, buttonLabel, isPending } = props;

  return (
    <DrawerFooter
      className={cn(
        'border-t border-[#00000014] p-4 max-sm:flex-row max-sm:justify-end',
        className,
      )}
    >
      <DrawerClose asChild>
        <Button type="button" variant={'neutral'}>
          Cancel
        </Button>
      </DrawerClose>

      <ButtonLoading label={buttonLabel} isPending={isPending} />
    </DrawerFooter>
  );
};
