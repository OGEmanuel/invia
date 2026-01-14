import Billing from '@/assets/jsx-icons/billing';
import People from '@/assets/jsx-icons/people';
import User from '@/assets/jsx-icons/user';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { Link, useLocation } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

const SettingsLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <section className="flex justify-center">
      <div className="flex w-full max-w-226 gap-4 max-md:flex-col md:gap-16 md:py-8 md:max-lg:gap-10 lg:py-12">
        <Navbar />
        <main className="w-full max-w-160 max-md:px-5 max-md:pb-12 sm:max-md:self-center md:max-xl:px-8 md:max-lg:max-w-none">
          {children}
        </main>
      </div>
    </section>
  );
};

export default SettingsLayout;

const PAGES = [
  {
    name: 'Account',
    path: '/settings',
    icon: <User fill="#575554" />,
  },
  {
    name: 'Plan & Billings',
    path: '/settings/plan-billings',
    icon: <Billing />,
  },
  {
    name: 'Members',
    path: '/settings/members',
    icon: <People fill="#575554" />,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    if (!isMobile) return;

    const isMembers = pathname.startsWith('/settings/members');

    el.scrollTo({
      left: isMembers ? el.scrollWidth : 0,
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <aside
      ref={navRef}
      className="scrollbar-hidden w-full overflow-auto md:max-w-50 md:max-lg:px-8"
    >
      <div className="flex w-max gap-1 max-md:p-5 md:flex-col">
        {PAGES.map(page => (
          <Link
            key={page.path}
            to={page.path}
            className={cn(
              'flex w-full items-center gap-2 rounded-[12px] px-3 py-2 leading-6 -tracking-[0.02em] text-nowrap text-[#575554]',
              pathname === page.path &&
                'bg-[#F7F5F2] font-medium text-[#212121]',
            )}
          >
            {page.icon}
            {page.name}
          </Link>
        ))}
      </div>
    </aside>
  );
};
