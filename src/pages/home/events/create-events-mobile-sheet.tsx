import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import CreateEventsForm from './create-events-form';
import { cn } from '@/lib/utils';
import SheetContentWrapper, {
  SheetFooterWrapper,
} from '@/components/ui/custom/sheet-content-wrapper';

const CreateEventsMobileSheet = (props: {
  children?: React.ReactNode;
  open: boolean;
  onSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
  className?: string;
}) => {
  const { children, open, onSetOpen, title, description, className } = props;

  return (
    <Sheet open={open} onOpenChange={onSetOpen}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContentWrapper
        title={title}
        description={description}
        setOpen={onSetOpen}
      >
        <CreateEventsForm className={cn('h-[calc(100%-83px)]', className)}>
          <SheetFooterWrapper buttonLabel="Create event" />
        </CreateEventsForm>
      </SheetContentWrapper>
    </Sheet>
  );
};

export default CreateEventsMobileSheet;
