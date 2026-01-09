import Clipboard from '@/assets/jsx-icons/clipboard';
import Edit from '@/assets/jsx-icons/edit';
import { Button } from '@/components/ui/button';
import DialogContentWrapper, {
  DialogFooterWrapper,
  DialogMainContentwrapper,
} from '@/components/ui/custom/dialog-content-wrapper';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CreateEventsForm from '../create-events-form';
import Notice from '@/assets/jsx-icons/notice';
import CreateEventsMobileSheet from '../create-events-mobile-sheet';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useGetEventsInfo } from '@/lib/queries/hooks';
import { formatDateToFullWithWeekday } from '@/lib/utils';
import { useFormStore } from '@/store/submitting-store';
import ButtonLoading from '@/components/ui/custom/button-loading';
import useSendRequest from '@/lib/hooks/useSendRequest';
import { MUTATIONS } from '@/lib/queries';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/queries/query-keys';

const EventMenuDropdownDialog = (props: { className?: string }) => {
  const { className } = props;
  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });
  const navigate = useNavigate({ from: '/$eventId' });

  const [showEventDetailsDialog, setShowEventDetailsDialog] = useState(false);
  const [showEditEventDialog, setShowEditEventDialog] = useState(false);
  const [showMobileEditEventDialog, setShowMobileEditEventDialog] =
    useState(false);
  const [showDeleteEventDialog, setShowDeleteEventDialog] = useState(false);
  const { isFormSubmitting } = useFormStore();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useSendRequest<{ eventId: string }, any>({
    mutationFn: (data: { eventId: string }) =>
      MUTATIONS.deleteEvent(data.eventId),
    successToast: {
      title: 'Success!',
      description: 'Event deleted successfully.',
    },
    errorToast: {
      title: 'Failed!',
      description: 'Please try again.',
    },
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.events.all,
      });
      setShowDeleteEventDialog(false);
      navigate({
        to: '/',
        search: {
          page: 1,
          limit: 12,
        },
      });
    },
  });

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className={className}>
          <Button size={'icon-lg'} variant={'neutral'}>
            <MoreVertical className="text-[#575554]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setShowEventDetailsDialog(true)}>
            <Clipboard />
            Event details
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowEditEventDialog(true)}
            className="max-sm:hidden"
          >
            <Edit />
            Edit event
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowMobileEditEventDialog(true)}
            className="sm:hidden"
          >
            <Edit />
            Edit event
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setShowDeleteEventDialog(true)}
          >
            <Trash2 />
            Remove event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog
        open={showEventDetailsDialog}
        onOpenChange={setShowEventDetailsDialog}
      >
        <DialogContentWrapper
          title="Event details"
          className="max-sm:h-126 max-sm:max-w-88.25"
        >
          <DialogMainContentwrapper className="h-[calc(100%-61px)]">
            <EventDetails />
            <DialogFooterWrapper className="flex-row justify-end">
              <DialogClose asChild>
                <Button variant="neutral" className="w-max">
                  Close
                </Button>
              </DialogClose>
            </DialogFooterWrapper>
          </DialogMainContentwrapper>
        </DialogContentWrapper>
      </Dialog>
      <Dialog open={showEditEventDialog} onOpenChange={setShowEditEventDialog}>
        <DialogContentWrapper title="Edit Event" className="max-sm:hidden">
          <CreateEventsForm
            className="h-[calc(100%-61px)]"
            onSetOpen={setShowEditEventDialog}
            eventId={eventId}
          >
            <DialogFooter className="border-t border-[#00000014] p-4">
              <DialogClose asChild>
                <Button type="button" variant={'neutral'}>
                  Cancel
                </Button>
              </DialogClose>
              <ButtonLoading
                label="Save changes"
                isPending={isFormSubmitting}
              />
            </DialogFooter>
          </CreateEventsForm>
        </DialogContentWrapper>
      </Dialog>
      <Dialog
        open={showDeleteEventDialog}
        onOpenChange={setShowDeleteEventDialog}
      >
        <DialogContent className="flex max-w-88.25 flex-col gap-8 rounded-3xl px-4 pt-10 pb-4 sm:max-w-130 [&>button_svg:not([class*='size-'])]:size-6">
          <DialogHeader className="sr-only">
            <DialogTitle>Remove this event?</DialogTitle>
            <DialogDescription>
              This action will permanently delete the event and all associated
              guest information. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DeleteEvent />
          <DialogFooter className="flex-row justify-center sm:justify-center">
            <DialogClose asChild>
              <Button variant="neutral">Cancel</Button>
            </DialogClose>
            <ButtonLoading
              label="Remove event"
              onClick={() => mutate({ eventId })}
              isPending={isPending}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CreateEventsMobileSheet
        title="Edit Event"
        open={showMobileEditEventDialog}
        onSetOpen={setShowMobileEditEventDialog}
        className="h-[calc(100%-61px)]"
        isPending={isFormSubmitting}
        eventId={eventId}
      />
    </>
  );
};

export default EventMenuDropdownDialog;

const EventDetails = () => {
  const { eventId } = useParams({
    from: '/_authenticated/$eventId',
  });

  const { data } = useGetEventsInfo(eventId);

  return (
    <ul className="px-5 pt-4 text-sm/5 -tracking-[0.02em] text-[#575554] [&>li]:flex [&>li]:items-center [&>li]:justify-between [&>li]:border-b [&>li]:border-dashed [&>li]:border-[#00000014] [&>li]:py-6 [&>li]:first:pt-0 [&>li]:last:border-0 [&>li>span]:leading-6 [&>li>span]:font-medium [&>li>span]:text-[#212121]">
      <li>
        Event name
        <span>{data?.data.name}</span>
      </li>
      <li>
        Type
        <span className="capitalize">{data?.data.category.toLowerCase()}</span>
      </li>
      <li>
        Date
        <span>{formatDateToFullWithWeekday(data?.data.date)}</span>
      </li>
      <li>
        Time
        <span>
          {data?.data.time === '' ? '--' : data?.data.time}
          {/* 10:30 AM */}
        </span>
      </li>
      <li>
        Location
        <span>{data?.data.location === '' ? '--' : data?.data.location}</span>
      </li>
    </ul>
  );
};

const DeleteEvent = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-100 flex-col items-center gap-5 text-center">
        <Notice />
        <div className="flex flex-col gap-1">
          <h3 className="font-serif text-xl/7 text-[#212121]">
            Remove this event?
          </h3>
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
            This action will permanently delete the event and all associated
            guest information. This cannot be undone.
          </p>
        </div>
      </div>
    </div>
  );
};
