import members from '@/assets/icons/members.svg';
import Bolt from '@/assets/jsx-icons/bolt';
import { Button } from '@/components/ui/button';
import UpgradeModal, { UpgradeSheet } from '../../upgrade-modal';
import { useState } from 'react';

const NoMembers = () => {
  const [open, setOpen] = useState(false);
  const [openSmall, setOpenSmall] = useState(false);

  return (
    <div className="flex h-120 items-center justify-center">
      <div className="flex w-full max-w-100 flex-col items-center gap-4 text-center">
        <div className="h-25 w-50">
          <img src={members} alt="members" className="size-full" />
        </div>
        <div>
          <h2 className="font-serif text-xl/7 text-[#212121]">
            Work better as a team
          </h2>
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
            The Studio plan unlocks team members, permissions, and secure
            collaboration for larger events.
          </p>
        </div>
        <div className="max-md:hidden">
          <UpgradeModal
            open={open}
            setOpen={setOpen}
            openSmall={openSmall}
            setOpenSmall={setOpenSmall}
          >
            <Button
              variant={'secondary'}
              className="outline-[#874CF933]"
              size={'lg'}
            >
              Upgrade plan
              <Bolt />
            </Button>
          </UpgradeModal>
        </div>
        <div className="md:hidden">
          <UpgradeSheet
            open={open}
            setOpen={setOpen}
            openSmall={openSmall}
            setOpenSmall={setOpenSmall}
          >
            <Button
              variant={'secondary'}
              className="outline-[#874CF933]"
              size={'lg'}
            >
              Upgrade
              <Bolt />
            </Button>
          </UpgradeSheet>
        </div>
      </div>
    </div>
  );
};

export default NoMembers;
