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
import { ConfirmEmail, EditEmailForm, ProfileCard } from '.';
import { Activity, useState } from 'react';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/ui/custom/button-loading';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import DrawerContentWrapper, {
  DrawerFooterWrapper,
} from '@/components/ui/custom/drawer-content-wrapper';

const EditEmail = () => {
  const [open, setOpen] = useState(false);
  const [openSmall, setOpenSmall] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(true);

  return (
    <ProfileCard name="Email address" value="bojnuga.empire@gmail.com">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="max-sm:hidden">
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#212121]">
            Edit
          </p>
        </DialogTrigger>
        <Activity mode={openConfirm ? 'visible' : 'hidden'}>
          <DialogContent
            className={cn(
              "flex h-max flex-col gap-11.5 rounded-3xl px-0 pt-10 pb-4 sm:max-w-130 [&>button_svg:not([class*='size-'])]:size-6",
            )}
          >
            <DialogHeader className={cn('sr-only')}>
              <DialogTitle className="font-serif text-xl/7 text-[#212121] max-sm:text-start">
                Confirm your new email address
              </DialogTitle>
              <DialogDescription>
                {`We’ve`} sent a confirmation link to your new email. Click the
                link to complete the update.
              </DialogDescription>
            </DialogHeader>
            <ConfirmEmail />
            <DialogFooter className="justify-center sm:justify-center">
              <DialogClose asChild>
                <Button
                  type="button"
                  onClick={() => setOpenConfirm(false)}
                  variant={'neutral'}
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Activity>
        <Activity mode={openConfirm ? 'hidden' : 'visible'}>
          <DialogContentWrapper
            title="Edit email address"
            description="A verification email will be sent to your new address."
            className="h-max rounded-[16px] max-sm:hidden [&>div]:first:border-b-0"
          >
            <EditEmailForm>
              <DialogFooter className="border-t border-[#00000014] p-4">
                <DialogClose asChild>
                  <Button type="button" variant={'neutral'}>
                    Cancel
                  </Button>
                </DialogClose>
                <ButtonLoading label="Change" isPending={false} />
              </DialogFooter>
            </EditEmailForm>
          </DialogContentWrapper>
        </Activity>
      </Dialog>
      <Drawer open={openSmall} onOpenChange={setOpenSmall}>
        <DrawerTrigger className="sm:hidden">
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#212121]">
            Edit
          </p>
        </DrawerTrigger>
        <Activity mode={openConfirm ? 'visible' : 'hidden'}>
          <DrawerContent
            className={cn(
              "flex h-max flex-col gap-11.5 rounded-3xl px-0 pt-10 pb-4 sm:max-w-130 [&>button_svg:not([class*='size-'])]:size-6",
            )}
          >
            <DrawerHeader className={cn('sr-only')}>
              <DrawerTitle className="font-serif text-xl/7 text-[#212121] max-sm:text-start">
                Confirm your new email address
              </DrawerTitle>
              <DrawerDescription>
                {`We’ve`} sent a confirmation link to your new email. Click the
                link to complete the update.
              </DrawerDescription>
            </DrawerHeader>
            <ConfirmEmail />
            <DrawerFooter className="justify-center sm:justify-center">
              <DrawerClose asChild>
                <Button
                  type="button"
                  onClick={() => setOpenConfirm(false)}
                  variant={'neutral'}
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Activity>
        <Activity mode={openConfirm ? 'hidden' : 'visible'}>
          <DrawerContentWrapper
            title="Edit email address"
            description="A verification email will be sent to your new address."
            className="[&>div]:first:border-b-0"
          >
            <EditEmailForm className="h-[calc(100%-83px)] justify-between">
              <DrawerFooterWrapper buttonLabel="Change" className="sm:hidden" />
            </EditEmailForm>
          </DrawerContentWrapper>
        </Activity>
      </Drawer>
    </ProfileCard>
  );
};

export default EditEmail;
