import { Button } from '@/components/ui/button';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import SendInvitationsForm from './send-invitations-form';
import React, { Activity, useState } from 'react';
import PreviewInvitations from './invitations-preview';
import MessageSent from '@/assets/jsx-icons/message-sent';
import DrawerContentWrapper from '@/components/ui/custom/drawer-content-wrapper';
import {
  Drawer,
  DrawerClose,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer';

const SendInvitations = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const { children, className } = props;
  const [page, setPage] = useState(0);

  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
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
              <Button
                type="button"
                variant={'neutral'}
                onClick={() => setPage(0)}
              >
                Back to edit
              </Button>
              <Button type="submit" onClick={() => setPage(2)}>
                Send to guests
              </Button>
            </DialogFooter>
          </PreviewInvitations>
        </DialogContentWrapper>
      </Activity>
      <Activity mode={page === 2 ? 'visible' : 'hidden'}>
        <DialogContentWrapper
          title="Message sent"
          className="h-auto items-center gap-5 px-4 pt-10 pb-4 max-sm:hidden"
          hideHeader
        >
          <MessageSent />
          <div className="flex w-full max-w-100 flex-col gap-2 text-center">
            <h3 className="font-serif text-xl/7 text-[#212121]">
              Your invitations are on the way!
            </h3>
            <p className="text-sm/5 -tracking-[0.02em] text-[#575554]">
              Guests will receive your invitation shortly, and you’ll see
              updates as they respond.
            </p>
          </div>
          <DialogFooter className="w-full justify-center sm:justify-center">
            <DialogClose asChild>
              <Button
                type="button"
                variant={'neutral'}
                onClick={() => setPage(0)}
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContentWrapper>
      </Activity>
    </Dialog>
  );
};

export default SendInvitations;

export const SendInvitationsMobileSheet = (props: {
  open: boolean;
  onSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  children?: React.ReactNode;
}) => {
  const { open, onSetOpen, children, className } = props;
  const [page, setPage] = useState(0);

  return (
    <Drawer open={open} onOpenChange={onSetOpen}>
      {children && (
        <DrawerTrigger asChild className={className}>
          {children}
        </DrawerTrigger>
      )}
      <Activity mode={page === 0 ? 'visible' : 'hidden'}>
        <DrawerContentWrapper
          title="Send Invitations"
          description="Send invitations to your guests."
          className="bg-white"
        >
          <SendInvitationsForm setPage={setPage}>
            <DrawerFooter className="flex-row justify-end border-t border-[#00000014] p-4">
              <DrawerClose asChild>
                <Button type="button" variant={'neutral'}>
                  Cancel
                </Button>
              </DrawerClose>
              <Button type="submit">Preview message</Button>
            </DrawerFooter>
          </SendInvitationsForm>
        </DrawerContentWrapper>
      </Activity>
      <Activity mode={page === 1 ? 'visible' : 'hidden'}>
        <DrawerContentWrapper
          title="Preview and send to guests"
          description="Review your invitation before sending it to your guests."
          className="bg-white"
        >
          <PreviewInvitations>
            <DrawerFooter className="flex-row justify-end border-t border-[#00000014] p-4">
              <Button
                type="button"
                variant={'neutral'}
                onClick={() => setPage(0)}
              >
                Back to edit
              </Button>
              <Button type="submit" onClick={() => setPage(2)}>
                Send to guests
              </Button>
            </DrawerFooter>
          </PreviewInvitations>
        </DrawerContentWrapper>
      </Activity>
      <Activity mode={page === 2 ? 'visible' : 'hidden'}>
        <DrawerContentWrapper
          title="Message sent"
          className="h-auto items-center gap-5 px-4 pt-10 pb-4"
          hideHeader
        >
          <MessageSent />
          <div className="flex w-full max-w-100 flex-col gap-2 text-center">
            <h3 className="font-serif text-xl/7 text-[#212121]">
              Your invitations are on the way!
            </h3>
            <p className="text-sm/5 -tracking-[0.02em] text-[#575554]">
              Guests will receive your invitation shortly, and you’ll see
              updates as they respond.
            </p>
          </div>
          <DrawerFooter className="justify-center sm:w-full sm:justify-center">
            <DialogClose asChild>
              <Button
                type="button"
                variant={'neutral'}
                onClick={() => setPage(0)}
              >
                Close
              </Button>
            </DialogClose>
          </DrawerFooter>
        </DrawerContentWrapper>
      </Activity>
    </Drawer>
  );
};
