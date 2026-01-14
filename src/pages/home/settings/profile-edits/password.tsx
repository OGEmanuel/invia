import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EditPasswordForm, ProfileCard } from '.';
import { useState } from 'react';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/ui/custom/button-loading';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import DrawerContentWrapper, {
  DrawerFooterWrapper,
} from '@/components/ui/custom/drawer-content-wrapper';

const EditPassword = () => {
  const [open, setOpen] = useState(false);

  return (
    <ProfileCard name="Password" value="**********">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="max-sm:hidden">
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#6155F5]">
            Change password
          </p>
        </DialogTrigger>
        <DialogContentWrapper
          title="Create new password"
          description="This will be visible on your profile and for your."
          className="h-max rounded-[16px] max-sm:hidden [&>div]:first:border-b-0"
        >
          <EditPasswordForm>
            <DialogFooter className="border-t border-[#00000014] p-4">
              <DialogClose asChild>
                <Button type="button" variant={'neutral'}>
                  Cancel
                </Button>
              </DialogClose>
              <ButtonLoading label="Change password" isPending={false} />
            </DialogFooter>
          </EditPasswordForm>
        </DialogContentWrapper>
      </Dialog>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className="sm:hidden">
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#6155F5]">
            Change password
          </p>
        </DrawerTrigger>
        <DrawerContentWrapper
          title="Create new password"
          description="This will be visible on your profile and for your."
          className="[&>div]:first:border-b-0"
        >
          <EditPasswordForm className="h-[calc(100%-83px)] justify-between">
            <DrawerFooterWrapper
              buttonLabel="Change password"
              className="sm:hidden"
            />
          </EditPasswordForm>
        </DrawerContentWrapper>
      </Drawer>
    </ProfileCard>
  );
};

export default EditPassword;
