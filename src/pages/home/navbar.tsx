import { Link, useLocation, useRouter } from '@tanstack/react-router';
import Logo from '../auth/components/logo';
import { Button } from '@/components/ui/button';
import AvatarCustom from '@/components/ui/custom/avatar';
import Bolt from '@/assets/jsx-icons/bolt';
import { Menu, X } from 'lucide-react';
import UpgradeModal, { UpgradeSheet } from './upgrade-modal';
import { Activity, useState } from 'react';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import LogoIcon from '@/assets/jsx-icons/logo-icon';
import type { BusinessInfoType } from '@/lib/constants';
import Cookies from 'js-cookie';
import { useGetBusinessInfo } from '@/lib/queries/hooks';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openSmall, setOpenSmall] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const { pathname } = useLocation();
  const { data, isPending, isError } = useGetBusinessInfo();

  const businessInfo: BusinessInfoType = data?.data;

  return (
    <nav className="bg-background fixed z-20 flex w-full justify-center border-b border-[#00000014] py-4">
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
          {!openMobileNav && (
            <>
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
              {isPending ? (
                <div className="size-10 animate-pulse rounded-full bg-gray-300"></div>
              ) : (
                <Activity mode={isError ? 'hidden' : 'visible'}>
                  <ProfileDropdown>
                    <AvatarCustom
                      src={businessInfo.avatar}
                      alt={businessInfo.name}
                      fallback={businessInfo.name[0]}
                      className="size-10"
                    />
                  </ProfileDropdown>
                </Activity>
              )}
            </>
          )}
          <MobileNav
            open={open}
            setOpen={setOpen}
            openSmall={openSmall}
            setOpenSmall={setOpenSmall}
            openMobileNav={openMobileNav}
            onSetOpenMobileNav={setOpenMobileNav}
          >
            <Button size={'icon-lg'} variant={'neutral'} className="size-10">
              {openMobileNav ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </MobileNav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const ProfileDropdown = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  const { data } = useGetBusinessInfo();
  const router = useRouter();

  const businessInfo: BusinessInfoType = data?.data;

  const handleLogOut = async () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('svh');
    Cookies.remove('rf');

    await router.invalidate();
  };

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
            src={businessInfo.avatar}
            alt={businessInfo.name}
            fallback={businessInfo.name[0]}
            className="size-8 text-sm/[22px]"
          />
          <p className="font-medium -tracking-[0.02em] text-[#212121]">
            {businessInfo.name}
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
          <button
            onClick={handleLogOut}
            className="flex w-full cursor-pointer items-center gap-2 text-base/6 -tracking-[0.02em] text-[#575554]"
          >
            <Logout />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MobileNav = (props: {
  children?: React.ReactNode;
  openMobileNav: boolean;
  onSetOpenMobileNav: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openSmall: boolean;
  setOpenSmall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    children,
    open,
    setOpen,
    openSmall,
    setOpenSmall,
    openMobileNav,
    onSetOpenMobileNav,
  } = props;
  const { pathname } = useLocation();

  return (
    <Sheet open={openMobileNav} onOpenChange={onSetOpenMobileNav}>
      <SheetTrigger className="sm:hidden" asChild>
        {children}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="mt-18.25 h-[calc(100vh-73px)] w-full gap-10 px-5 [&>button]:hidden"
        overlayClassName="bg-transparent"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Navigate to the main sections of the website.
          </SheetDescription>
        </SheetHeader>
        <nav className="pt-10">
          <ul className="flex flex-col gap-2 font-serif text-2xl/8 [&>li]:rounded-[8px] [&>li]:p-2">
            <li className="has-[.active]:bg-primary/10 has-[.active]:text-primary relative">
              <Link
                to={'/'}
                className={cn(
                  'absolute inset-0',
                  !pathname.startsWith('/settings') &&
                    !pathname.startsWith('/messages') &&
                    'active',
                )}
              />
              Events
            </li>
            <li className="has-[.active]:bg-primary/10 has-[.active]:text-primary relative">
              <Link to={'/messages'} className="absolute inset-0" />
              Messages
            </li>
            <li className="has-[.active]:bg-primary/10 has-[.active]:text-primary relative">
              <Link to={'/settings'} className="absolute inset-0" />
              Settings
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <LogoIcon />
          <div className="text-sm/6 -tracking-[0.02em]">
            <p>Upgrade to do more with Invia!</p>
            <UpgradeSheet
              open={open}
              setOpen={setOpen}
              setOpenSmall={setOpenSmall}
              openSmall={openSmall}
            >
              <Button
                className="text-primary h-auto w-max p-0 text-sm/6 -tracking-[0.02em] underline"
                variant={'ghost'}
              >
                Upgrade
              </Button>
            </UpgradeSheet>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
