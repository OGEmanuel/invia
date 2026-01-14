import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EditBusinessNameForm, ProfileCard } from '.';
import { useState } from 'react';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
import { Button } from '@/components/ui/button';
import ButtonLoading from '@/components/ui/custom/button-loading';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import DrawerContentWrapper, {
  DrawerFooterWrapper,
} from '@/components/ui/custom/drawer-content-wrapper';

const EditBusinessName = () => {
  const [open, setOpen] = useState(false);
  const [openSmall, setOpenSmall] = useState(false);

  return (
    <ProfileCard name="Business name" value="Abolaji Events Limited">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="max-sm:hidden">
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#212121]">
            Edit
          </p>
        </DialogTrigger>
        <DialogContentWrapper
          title="Edit Business name"
          description="Edit your business name."
          className="h-max rounded-[16px] max-sm:hidden [&>div]:first:border-b-0"
        >
          <EditBusinessNameForm>
            <DialogFooter className="border-t border-[#00000014] p-4">
              <DialogClose asChild>
                <Button type="button" variant={'neutral'}>
                  Cancel
                </Button>
              </DialogClose>
              <ButtonLoading label="Save change" isPending={false} />
            </DialogFooter>
          </EditBusinessNameForm>
        </DialogContentWrapper>
      </Dialog>
      <Drawer open={openSmall} onOpenChange={setOpenSmall}>
        <DrawerTrigger className="sm:hidden">
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#212121]">
            Edit
          </p>
        </DrawerTrigger>
        <DrawerContentWrapper
          title="Edit Business name"
          description="Edit your business name."
          className="[&>div]:first:border-b-0"
        >
          <EditBusinessNameForm className="h-[calc(100%-83px)] justify-between">
            <DrawerFooterWrapper
              buttonLabel="Save changes"
              className="h-max sm:hidden"
            />
          </EditBusinessNameForm>
        </DrawerContentWrapper>
      </Drawer>
    </ProfileCard>
  );
};

export default EditBusinessName;
