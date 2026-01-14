import Bolt from '@/assets/jsx-icons/bolt';
import UpgradeIllustration from '@/assets/jsx-icons/upgrade-illustration';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type Currency = 'usd' | 'ngn';
type Billing = 'monthly' | 'yearly';
type Plan = 'pro' | 'studio';

type Sub = {
  monthly: Record<Currency, number>;
  yearly: Record<Currency, number>;
};

const UpgradeModal = (props: {
  children?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openSmall: boolean;
  setOpenSmall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { children, open, setOpen, setOpenSmall } = props;
  const isMobile = useMediaQuery('(max-width: 767px)');

  const openDialog = () => {
    if (!isMobile) {
      setOpen(true);
      setOpenSmall(false);
    } else {
      setOpenSmall(true);
      setOpen(false);
    }

    sessionStorage.setItem('hasSeenModal', 'true');
  };

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenModal');

    if (hasSeenModal) return;

    const timer = setTimeout(() => {
      openDialog();
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="flex flex-col gap-10 overflow-auto rounded-4xl p-10 max-md:hidden md:h-170 md:max-w-180 [&>button]:top-2 [&>button]:right-2 [&>button]:rounded-full [&>button]:bg-[#FEFCF9] [&>button]:p-2"
        overlayClassName={'max-md:hidden'}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Do more with Invia!</DialogTitle>
          <DialogDescription>
            Unlock advanced guest list tools, follow-ups, and team features as
            your events grow.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          {!isMobile && <UpgradeIllustration />}
          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-[2rem]/10 text-[#212121]">
              Do more with Invia!
            </h1>
            <p className="max-w-120 text-sm/5 -tracking-[0.02em] text-[#575554]">
              Unlock advanced guest list tools, follow-ups, and team features as
              your events grow.
            </p>
          </div>
        </div>
        <UpgradeContent />
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;

export const UpgradeContent = () => {
  const [period, setPeriod] = useState<Billing>('yearly');
  const [currency, setCurrency] = useState<Currency>('usd');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between sm:items-center">
        <div className="flex gap-2 max-sm:flex-col sm:items-center">
          <PlanPeriod period={period} setPeriod={setPeriod} />
          <p className="text-sm/[22px] -tracking-[0.02em]">
            {' '}
            <span className="font-semibold">Save 30%</span> on a yearly plan
          </p>
        </div>
        <PlanCurrency currency={currency} setCurrency={setCurrency} />
      </div>
      <div className="flex gap-4 max-sm:flex-col">
        <PlanPriceCard
          plan="pro"
          period={period}
          currency={currency}
          perks={[
            {
              description: 'Up to 300 guests per event',
            },
            {
              description: 'Unlimited events',
            },
            {
              description: 'Reusable message templates',
            },
            {
              description: 'Invite cover images',
            },
            {
              description: 'Guest activity timeline',
            },
            {
              description: 'Follow-up messages',
            },
          ]}
        />
        <PlanPriceCard
          period={period}
          currency={currency}
          plan="studio"
          perks={[
            {
              description: 'All Pro features',
            },
            {
              description: 'Unlimited guests',
            },
            {
              description: 'Team members & permissions',
            },
            {
              description: 'Secure guest data access',
            },
            {
              description: 'Advanced guest timelines & logs',
            },
            {
              description: 'Flexible exports (PDF, SVG, filtered)',
            },
          ]}
        />
      </div>
      <hr className="h-2.5 border-none bg-[#0000000D]" />
      <p className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
        Invia includes free tools to get started. Paid plans give you access to
        more powerful features for a selected period. When a plan ends, paid
        features are paused and can be re-enabled anytime by choosing a new
        plan.
      </p>
    </div>
  );
};

export const UpgradeSheet = (props: {
  children?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openSmall: boolean;
  setOpenSmall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { children, openSmall, setOpen, setOpenSmall } = props;
  const isMobile = useMediaQuery('(max-width: 767px)');

  const openDialog = () => {
    if (isMobile) {
      setOpen(false);
      setOpenSmall(true);
    } else {
      setOpenSmall(false);
      setOpen(true);
    }

    sessionStorage.setItem('hasSeenModal', 'true');
  };

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenModal');

    if (hasSeenModal) return;

    const timer = setTimeout(() => {
      openDialog();
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <Drawer open={openSmall} onOpenChange={setOpenSmall}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent overlayClassName={'md:hidden '}>
        <DrawerHeader className="sr-only">
          <DrawerTitle>Do more with Invia!</DrawerTitle>
          <DrawerDescription>
            Unlock advanced guest list tools, follow-ups, and team features as
            your events grow.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-10 overflow-auto rounded-t-[24px] p-5 md:hidden [&>button]:top-2 [&>button]:right-2 [&>button]:rounded-full [&>button]:bg-[#FEFCF9] [&>button]:p-2">
          <div className="flex flex-col items-center gap-2">
            {isMobile && <UpgradeIllustration size={'88'} />}
            <div className="flex flex-col gap-1 text-center">
              <h1 className="text-2xl/8 text-[#212121]">Do more with Invia!</h1>
              <p className="max-w-120 text-sm/[22px] -tracking-[0.02em] text-[#575554]">
                Unlock advanced guest list tools, follow-ups, and team features
                as your events grow.
              </p>
            </div>
          </div>
          <UpgradeContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const PlanPeriod = (props: { period: string; setPeriod: any }) => {
  const { period, setPeriod } = props;

  return (
    <Tabs value={period} onValueChange={setPeriod}>
      <TabsList>
        <TabsTrigger
          value="monthly"
          className="data-[state=active]:bg-[#479FFD] data-[state=active]:text-[#FFFFFF]"
        >
          Monthly
        </TabsTrigger>
        <TabsTrigger
          value="yearly"
          className="data-[state=active]:bg-[#479FFD] data-[state=active]:text-[#FFFFFF]"
        >
          Yearly
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

const PlanCurrency = (props: { currency: string; setCurrency: any }) => {
  const { currency, setCurrency } = props;

  return (
    <Tabs value={currency} onValueChange={setCurrency}>
      <TabsList>
        <TabsTrigger
          value="ngn"
          className="data-[state=active]:bg-white data-[state=active]:text-[#212121]"
        >
          NGN
        </TabsTrigger>
        <TabsTrigger
          value="usd"
          className="data-[state=active]:bg-white data-[state=active]:text-[#212121]"
        >
          USD
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

type Perk = {
  description: string;
};

const PlanPriceCard = (props: {
  plan: Plan;
  perks: Perk[];
  period: Billing;
  currency: Currency;
}) => {
  const { plan, perks, period, currency } = props;

  const plans: Record<Plan, Sub> = {
    pro: {
      monthly: { usd: 30, ngn: 45 },
      yearly: { usd: 25, ngn: 38 },
    },
    studio: {
      monthly: { usd: 200, ngn: 300 },
      yearly: { usd: 180, ngn: 270 },
    },
  };

  const price = plans[plan][period][currency];
  const priceOfMonth = plans[plan].monthly[currency];

  return (
    <div
      className={cn(
        'boder-[#00000014] flex flex-col gap-6 rounded-2xl px-4 pt-4 pb-5',
        plan === 'studio' ? 'bg-[#3A99FF] text-white' : 'border',
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p
            className={cn(
              'font-serif text-2xl/8 capitalize',
              plan === 'pro' && 'text-[#212121]',
            )}
          >
            {plan}
          </p>
          <p
            className={cn(
              'text-sm/[22px] -tracking-[0.02em]',
              plan === 'pro' ? 'text-[#575554]' : '#FFFFFFCC',
            )}
          >
            Everything you need to create, manage, and track guest lists.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            className={cn(
              'flex items-center gap-2 font-serif text-2xl/8',
              plan === 'pro'
                ? 'text-[#212121] [&>span]:text-[#A3A19D]'
                : 'text-white [&>span]:text-black/35',
            )}
          >
            {currency === 'usd' ? `$${price}` : `₦${price}K`}
            {period === 'yearly' && (
              <span>
                {currency === 'usd' ? (
                  <span className="line-through">
                    {'$'}
                    {priceOfMonth}
                  </span>
                ) : (
                  <span className="line-through">
                    {'₦'}
                    {priceOfMonth}K
                  </span>
                )}
              </span>
            )}
          </p>
          <p
            className={cn(
              'text-end text-sm/4 -tracking-[0.02em]',
              plan === 'pro' ? 'text-[#A3A19D]' : 'text-[#FFFFFFB2]',
            )}
          >
            per <br /> month
          </p>
        </div>
        <Button
          variant={'secondary'}
          size={'lg'}
          className={cn(
            plan === 'studio' && 'bg-white text-[#3A99FF] hover:bg-white',
            plan === 'studio' ? 'outline-[#FFFFFF33]' : 'outline-[#874CF933]',
          )}
        >
          Upgrade
          <Bolt fill={plan === 'pro' ? 'white' : '#3A99FF'} />
        </Button>
      </div>
      <div className="flex flex-col gap-5">
        {perks.map(perk => (
          <div key={perk.description} className="flex items-center gap-2">
            <Bolt fill={plan === 'pro' ? '#874CF980' : 'white'} />
            <p
              className={cn(
                'text-sm/[22px] -tracking-[0.02em]',
                plan === 'pro' ? 'text-[#575554]' : 'text-white',
              )}
            >
              {perk.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
