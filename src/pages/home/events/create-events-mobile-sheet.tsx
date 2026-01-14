import CreateEventsForm from './create-events-form';
import { cn } from '@/lib/utils';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import DrawerContentWrapper, {
  DrawerFooterWrapper,
} from '@/components/ui/custom/drawer-content-wrapper';

const CreateEventsMobileSheet = (props: {
  children?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  isPending?: boolean;
  onSetOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
  eventId?: string;
}) => {
  const {
    children,
    title,
    description,
    className,
    eventId,
    isPending,
    onSetOpen,
    open,
  } = props;

  return (
    <Drawer open={open} onOpenChange={onSetOpen}>
      {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
      <DrawerContentWrapper title={title} description={description}>
        <CreateEventsForm
          eventId={eventId}
          className={cn('h-[calc(100%-83px)]', className)}
          onSetOpen={onSetOpen}
        >
          <DrawerFooterWrapper
            buttonLabel="Create event"
            isPending={isPending}
          />
        </CreateEventsForm>
      </DrawerContentWrapper>
    </Drawer>
  );
};

export default CreateEventsMobileSheet;
