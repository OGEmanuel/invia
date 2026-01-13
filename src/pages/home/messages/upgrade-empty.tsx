import UpgradeEmptyMessages from '@/assets/jsx-icons/upgrade-empty-messages';
import UpgradeModal, { UpgradeSheet } from '../upgrade-modal';
import { Button } from '@/components/ui/button';
import Bolt from '@/assets/jsx-icons/bolt';
import { useState } from 'react';

const UpgradeEmpty = () => {
  const [open, setOpen] = useState(false);
  const [openSmall, setOpenSmall] = useState(false);

  return (
    <div className="flex w-full max-w-[20rem] flex-col items-center gap-2 sm:max-w-100">
      <UpgradeEmptyMessages />
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="font-serif leading-[100%] sm:text-2xl">
            Create reusable messages
          </h2>
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#626262] sm:leading-6">
            Upgrade your plan to create reusable message templates for faster
            and more consistent invitations.
          </p>
        </div>
        <div>
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
                Upgrade plan
                <Bolt />
              </Button>
            </UpgradeSheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeEmpty;
