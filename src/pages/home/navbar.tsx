import { Link } from '@tanstack/react-router';
import Logo from '../auth/components/logo';
import { Button } from '@/components/ui/button';
import AvatarCustom from '@/components/ui/custom/avatar';
import Bolt from '@/assets/jsx-icons/bolt';
import { Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex justify-center border-b border-[#00000014] py-4">
      <div className="flex w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <div className="flex items-center justify-between gap-6">
          <div>
            <Link to={'/'}>
              <Logo className="max-sm:hidden" />
            </Link>
          </div>
          <ul className="font-inter flex items-center gap-2 max-sm:hidden [&_a]:rounded-[12px] [&_a]:px-3 [&_a]:py-2 [&_a]:leading-6 [&_a]:tracking-[-0.02em] [&_a]:text-[#575554]">
            <li>
              <Link
                to={'/'}
                className="[.active]:bg-[#F7F5F2] [.active]:font-medium [.active]:text-[#212121]"
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
          <Button variant={'secondary'} className="">
            Upgrade
            <Bolt />
          </Button>
          <AvatarCustom src={''} alt={''} fallback={'A'} className="size-10" />
          <button className="cursor-pointer rounded-[12px] border border-[#00000014] p-2.5 sm:hidden">
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
