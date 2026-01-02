import { Button } from '@/components/ui/button';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import SendInvitationsForm from './send-invitations-form';
import { Activity, useState } from 'react';

const SendInvitations = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  const [page, setPage] = useState(0);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <Activity mode={page === 0 ? 'visible' : 'hidden'}>
        <DialogContentWrapper
          title="Send Invitations"
          description="Send invitations to your guests."
          className="bg-white"
        >
          <SendInvitationsForm setPage={setPage}>
            <DialogFooter className="border-t border-[#00000014] p-4">
              <DialogClose asChild>
                <Button type="button" variant={'neutral'}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Preview message</Button>
            </DialogFooter>
          </SendInvitationsForm>
        </DialogContentWrapper>
      </Activity>
      <Activity mode={page === 1 ? 'visible' : 'hidden'}>
        <DialogContentWrapper
          title="Preview and send to guests"
          description="Review your invitation before sending it to your guests."
          className="bg-white"
        >
          <PreviewInvitations>
            <DialogFooter className="border-t border-[#00000014] p-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={'neutral'}
                  onClick={() => setPage(0)}
                >
                  Back to edit
                </Button>
              </DialogClose>
              <Button type="submit">Send to guests</Button>
            </DialogFooter>
          </PreviewInvitations>
        </DialogContentWrapper>
      </Activity>
    </Dialog>
  );
};

export default SendInvitations;

const PreviewInvitations = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  return (
    <div className={'h-[calc(100%-83px)]'}>
      <div className="flex h-[calc(100%-81px)] flex-col gap-6 overflow-auto"></div>
      {children}
    </div>
  );
};
