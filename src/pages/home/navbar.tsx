import { Link, useLocation } from '@tanstack/react-router';
import Logo from '../auth/components/logo';
import { Button } from '@/components/ui/button';
import AvatarCustom from '@/components/ui/custom/avatar';
import Bolt from '@/assets/jsx-icons/bolt';
import { Menu } from 'lucide-react';
import UpgradeModal, { UpgradeSheet } from './upgrade-modal';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Edit from '@/assets/jsx-icons/edit';
import Logout from '@/assets/jsx-icons/logout';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openSmall, setOpenSmall] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="flex justify-center border-b border-[#00000014] py-4">
      <div className="flex w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <div className="flex items-center justify-between gap-6">
          <div>
            <Link to={'/'}>
              <Logo className="max-sm:hidden" />
            </Link>
          </div>
          <ul className="flex items-center gap-2 max-sm:hidden [&_a]:rounded-[12px] [&_a]:px-3 [&_a]:py-2 [&_a]:leading-6 [&_a]:tracking-[-0.02em] [&_a]:text-[#575554]">
            <li>
              <Link
                to={'/'}
                className={cn(
                  '[.active]:bg-[#F7F5F2] [.active]:font-medium [.active]:text-[#212121]',
                  !pathname.startsWith('/settings') &&
                    !pathname.startsWith('/messages') &&
                    'bg-[#F7F5F2] font-medium text-[#212121]',
                )}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to={'/messages'}
                className="[.active]:bg-[#F7F5F2] [.active]:font-medium [.active]:text-[#212121]"
              >
                Messages
              </Link>
            </li>
            <li>
              <Link
                to={'/settings'}
                className="[.active]:bg-[#F7F5F2] [.active]:font-medium [.active]:text-[#212121]"
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
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
                Upgrade
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
          <ProfileDropdown>
            <AvatarCustom
              src={''}
              alt={''}
              fallback={'A'}
              className="size-10"
            />
          </ProfileDropdown>
          <button className="cursor-pointer rounded-[12px] border border-[#00000014] p-2.5 sm:hidden">
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const ProfileDropdown = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 rounded-[12px] p-1"
        align={'end'}
        sideOffset={10}
      >
        <DropdownMenuLabel className="flex items-center gap-2 p-2">
          <AvatarCustom
            src={''}
            alt={''}
            fallback={'A'}
            className="size-8 text-sm/[22px]"
          />
          <p className="font-medium -tracking-[0.02em] text-[#212121]">
            Abolaji Events
          </p>
        </DropdownMenuLabel>
        <hr className="h-1 w-full border-t border-dashed border-[#00000014]" />
        <DropdownMenuItem className="rounded-xl px-2 py-2.5 hover:bg-[#F7F5F2]">
          <Link
            to={'/settings'}
            className="flex items-center gap-2 text-base/6 -tracking-[0.02em] text-[#575554]"
          >
            <Edit />
            Account settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="mt-1 rounded-xl px-2 py-2.5 hover:bg-[#F7F5F2]">
          <button className="flex w-full cursor-pointer items-center gap-2 text-base/6 -tracking-[0.02em] text-[#575554]">
            <Logout />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
