import { cn } from '@/lib/utils';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../dialog';

const DialogContentWrapper = (props: {
  children?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  hideHeader?: boolean;
}) => {
  const { children, title, description, className, hideHeader } = props;

  return (
    <DialogContent
      className={cn(
        "flex h-160 flex-col gap-0 rounded-3xl p-0 sm:max-w-130 [&>button_svg:not([class*='size-'])]:size-6",
        className,
      )}
    >
      <DialogHeader
        className={cn(
          'gap-0.5 border-b border-[#00000014] p-4',
          hideHeader && 'sr-only',
        )}
      >
        <DialogTitle className="font-serif text-xl/7 text-[#212121] max-sm:text-start">
          {title}
        </DialogTitle>
        <DialogDescription
          className={cn(
            'text-sm/5 -tracking-[0.02em] text-[#575554]',
            !description && 'sr-only',
          )}
        >
          {description ?? title}
        </DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  );
};

export default DialogContentWrapper;

export const DialogMainContentwrapper = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const { children, className } = props;

  return (
    <div className={cn('flex flex-col justify-between', className)}>
      {children}
    </div>
  );
};

export const DialogFooterWrapper = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const { children, className } = props;

  return (
    <DialogFooter className={cn('border-t border-[#00000014] p-4', className)}>
      {children}
    </DialogFooter>
  );
};
