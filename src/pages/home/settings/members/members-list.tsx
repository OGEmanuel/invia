import { Button } from '@/components/ui/button';
import DialogContentWrapper from '@/components/ui/custom/dialog-content-wrapper';
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
import { MoreVertical, Plus } from 'lucide-react';
import ButtonLoading from '@/components/ui/custom/button-loading';
import { Activity, useState } from 'react';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import DrawerContentWrapper, {
  DrawerFooterWrapper,
} from '@/components/ui/custom/drawer-content-wrapper';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@tanstack/react-router';
import InviteForm from './invite-form';
import EditInviteForm from './edit-invite-form';
import notice from '@/assets/icons/notice.svg';

const MEMBERS = [
  {
    name: 'Abolaji Olunuga',
    email: 'bo****@****.com',
    role: 'Owner',
  },
  {
    name: 'Sarah',
    email: 'sa****@****.com',
    role: 'Admin',
  },
  {
    name: 'Micheal P',
    email: 'mk****@****.com',
    role: 'Member',
  },
  {
    name: 'Emmanuel',
    email: 'ew****@****.com',
    role: 'Admin',
  },
];

const MembersList = () => {
  const [open, setOpen] = useState(false);
  const [openSmall, setOpenSmall] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="leading-6 -tracking-[0.02em] text-[#575554]">
          Team members
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="max-sm:hidden">
            <Button
              variant={'neutral'}
              className="h-9 rounded-[8px] border border-black/8 px-5 text-sm/[22px] font-medium -tracking-[0.02em] [&_svg:not([class*='size-'])]:size-5"
            >
              <Plus />
              Invite member
            </Button>
          </DialogTrigger>
          <DialogContentWrapper
            title="Invite member"
            description="Invite a new member to your team."
            className="rounded-[16px] bg-white max-sm:hidden"
          >
            <InviteForm>
              <DialogFooter className="border-t border-[#00000014] p-4">
                <DialogClose asChild>
                  <Button type="button" variant={'neutral'}>
                    Cancel
                  </Button>
                </DialogClose>
                <ButtonLoading label="Invite member" isPending={false} />
              </DialogFooter>
            </InviteForm>
          </DialogContentWrapper>
        </Dialog>
        <Drawer open={openSmall} onOpenChange={setOpenSmall}>
          <DrawerTrigger asChild className="sm:hidden">
            <Button
              variant={'neutral'}
              className="h-9 rounded-[8px] border border-black/8 px-5 text-sm/[22px] font-medium -tracking-[0.02em] [&_svg:not([class*='size-'])]:size-5"
            >
              <Plus />
              Invite member
            </Button>
          </DrawerTrigger>
          <DrawerContentWrapper
            title="Invite member"
            description="Invite a new member to your team."
            className="bg-white sm:hidden"
          >
            <InviteForm>
              <DrawerFooterWrapper buttonLabel="Invite member" />
            </InviteForm>
          </DrawerContentWrapper>
        </Drawer>
      </div>
      <hr className="border-y-[0.5px] border-black/8" />
      <div className="flex flex-col gap-5">
        {MEMBERS.map(member => (
          <MemberCard key={member.email} {...member} />
        ))}
      </div>
    </div>
  );
};

export default MembersList;

const MemberCard = (props: { name: string; email: string; role: string }) => {
  const { name, email, role } = props;
  return (
    <div className="flex items-center justify-between border-b border-dashed border-black/8 pb-5 text-sm/[22px] -tracking-[0.02em] last:border-b-0">
      <div className="flex basis-2/3 justify-between max-sm:flex-col sm:items-center">
        <p className="basis-full font-medium text-[#212121]">{name}</p>
        <p className="basis-full text-sm/[22px] text-[#575554] sm:text-center">
          {email}
        </p>
      </div>
      <div className="flex basis-1/3 items-center justify-end gap-1">
        <p className="rounded-[8px] border border-black/8 bg-white px-2 py-1.5 text-[#575554]">
          {role}
        </p>
        <MemberAction role={role}>
          <div className="rounded-[8px] p-1 hover:bg-[#F7F5F2]">
            <MoreVertical className="size-5" />
          </div>
        </MemberAction>
      </div>
    </div>
  );
};

const MemberAction = (props: { children: React.ReactNode; role: string }) => {
  const { children, role } = props;
  const [openEditInviteForm, setOpenEditInviteForm] = useState(false);
  const [openSmallEditInviteForm, setOpenSmallEditInviteForm] = useState(false);
  const [openRemoveMemberDialog, setOpenRemoveMemberDialog] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={7}
          className="w-30 rounded-[12px] border border-[#1D1D1D]/5 p-1 shadow-[0px_16px_16px_0px_#00000008]"
        >
          <Activity
            mode={role.toLowerCase() === 'owner' ? 'visible' : 'hidden'}
          >
            <DropdownMenuItem className="relative px-2 py-1 text-[#575554]">
              <Link
                to={'/settings'}
                className="absolute inset-0 flex items-center gap-2"
              />
              Account
            </DropdownMenuItem>
          </Activity>
          <Activity
            mode={role.toLowerCase() !== 'owner' ? 'visible' : 'hidden'}
          >
            <DropdownMenuItem
              className="rounded-[8px] px-2 py-1 text-[#575554] hover:bg-[#F7F5F2] max-sm:hidden"
              onSelect={() => setOpenEditInviteForm(true)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-[8px] px-2 py-1 text-[#575554] hover:bg-[#F7F5F2] sm:hidden"
              onSelect={() => setOpenSmallEditInviteForm(true)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              className="px-2 py-1"
              onSelect={() => setOpenRemoveMemberDialog(true)}
            >
              Remove
            </DropdownMenuItem>
          </Activity>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={openEditInviteForm} onOpenChange={setOpenEditInviteForm}>
        <DialogContentWrapper
          title="Edit member role"
          className="rounded-[16px] bg-white max-sm:hidden"
        >
          <EditInviteForm>
            <DialogFooter className="border-t border-[#00000014] p-4">
              <DialogClose asChild>
                <Button type="button" variant={'neutral'}>
                  Cancel
                </Button>
              </DialogClose>
              <ButtonLoading label="Save changes" isPending={false} />
            </DialogFooter>
          </EditInviteForm>
        </DialogContentWrapper>
        <Dialog
          open={openRemoveMemberDialog}
          onOpenChange={setOpenRemoveMemberDialog}
        >
          <DialogContent className="flex max-w-88.25 flex-col gap-8 rounded-3xl px-4 pt-10 pb-4 sm:max-w-130 [&>button_svg:not([class*='size-'])]:size-6">
            <DialogHeader className="sr-only">
              <DialogTitle>Remove Team Member?</DialogTitle>
              <DialogDescription>
                This member will lose access to the account and their profile
                will be permanently removed. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <RemoveMember />
            <DialogFooter className="flex-row justify-center sm:justify-center">
              <DialogClose asChild>
                <Button variant="neutral">Go back</Button>
              </DialogClose>
              <Button variant={'destructive'}>Remove member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Drawer
          open={openSmallEditInviteForm}
          onOpenChange={setOpenSmallEditInviteForm}
        >
          <DrawerContentWrapper
            title="Edit member role"
            className="bg-white sm:hidden"
          >
            <EditInviteForm>
              <DrawerFooterWrapper buttonLabel="Invite member" />
            </EditInviteForm>
          </DrawerContentWrapper>
        </Drawer>
      </Dialog>
    </>
  );
};

export const RemoveMember = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-100 flex-col items-center gap-5 text-center">
        <div className="size-22">
          <img src={notice} alt="notice-icon" className="size-full" />
        </div>
        <div className="flex flex-col gap-2 text-sm/[22px] -tracking-[0.02em] text-[#575554]">
          <h3 className="font-serif text-xl/7 text-[#212121]">
            Remove Team Member?
          </h3>
          <p>
            This member will lose access to the account and their profile will
            be permanently removed. This action cannot be undone.
          </p>
        </div>
      </div>
    </div>
  );
};
