import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EditNameForm, ProfileCard } from '.';
import { useState } from 'react';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/ui/custom/button-loading';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import DrawerContentWrapper, {
  DrawerFooterWrapper,
} from '@/components/ui/custom/drawer-content-wrapper';

const EditName = () => {
  const [open, setOpen] = useState(false);
  const [openSmall, setOpenSmall] = useState(false);

  return (
    <ProfileCard name="Name" value="Abolaji Olunuga">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="max-sm:hidden">
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#212121]">
            Edit
          </p>
        </DialogTrigger>
        <DialogContentWrapper
          title="Edit name"
          description="This will be visible on your profile and for your other team members if you have members."
          className="h-max rounded-[16px] max-sm:hidden [&>div]:first:border-b-0"
        >
          <EditNameForm>
            <DialogFooter className="border-t border-[#00000014] p-4">
              <DialogClose asChild>
                <Button type="button" variant={'neutral'}>
                  Cancel
                </Button>
              </DialogClose>
              <ButtonLoading label="Save change" isPending={false} />
            </DialogFooter>
          </EditNameForm>
        </DialogContentWrapper>
      </Dialog>
      <Drawer open={openSmall} onOpenChange={setOpenSmall}>
        <DrawerTrigger className="sm:hidden">
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#212121]">
            Edit
          </p>
        </DrawerTrigger>
        <DrawerContentWrapper
          title="Edit name"
          description="This will be visible on your profile and for your other team members if you have members."
          className="[&>div]:first:border-b-0"
        >
          <EditNameForm className="h-[calc(100%-83px)] justify-between">
            <DrawerFooterWrapper
              buttonLabel="Save changes"
              className="sm:hidden"
            />
          </EditNameForm>
        </DrawerContentWrapper>
      </Drawer>
    </ProfileCard>
  );
};

export default EditName;
