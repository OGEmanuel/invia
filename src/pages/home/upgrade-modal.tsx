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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const UpgradeModal = (props: {
  children?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openSmall: boolean;
  setOpenSmall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { children, open, setOpen, setOpenSmall } = props;
  const [period, setPeriod] = useState<string>('monthly');
  const [currency, setCurrency] = useState<string>('usd');
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
            <p className="font-inter max-w-120 text-sm/5 -tracking-[0.02em] text-[#575554]">
              Unlock advanced guest list tools, follow-ups, and team features as
              your events grow.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PlanPeriod period={period} setPeriod={setPeriod} />
              <p className="-tracking-[0.02em font-inter text-sm/[22px]">
                {' '}
                <span className="font-semibold">Save 30%</span>on a yearly
                subscription
              </p>
            </div>
            <PlanCurrency currency={currency} setCurrency={setCurrency} />
          </div>
          <div className="flex gap-4">
            <PlanPriceCard plan="pro" />
            <PlanPriceCard plan="studio" />
          </div>
          <hr className="h-2.5 border-none bg-[#0000000D]" />
          <p className="font-inter text-sm/[22px] -tracking-[0.02em] text-[#575554]">
            Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Curabitur tempus urna at turpis condimentum
            lobortis. Ut commodo efficitur neque.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;

export const UpgradeSheet = (props: {
  children?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openSmall: boolean;
  setOpenSmall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { children, openSmall, setOpen, setOpenSmall } = props;
  const [period, setPeriod] = useState<string>('monthly');
  const [currency, setCurrency] = useState<string>('usd');
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
    <Sheet open={openSmall} onOpenChange={setOpenSmall}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="bottom"
        className="flex h-170 flex-col gap-10 overflow-auto rounded-t-[24px] p-5 md:hidden [&>button]:top-2 [&>button]:right-2 [&>button]:rounded-full [&>button]:bg-[#FEFCF9] [&>button]:p-2"
        overlayClassName={'md:hidden'}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Do more with Invia!</SheetTitle>
          <SheetDescription>
            Unlock advanced guest list tools, follow-ups, and team features as
            your events grow.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-center gap-2">
          {isMobile && <UpgradeIllustration size={'88'} />}
          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-2xl/8 text-[#212121]">Do more with Invia!</h1>
            <p className="font-inter max-w-120 text-sm/[22px] -tracking-[0.02em] text-[#575554]">
              Unlock advanced guest list tools, follow-ups, and team features as
              your events grow.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <PlanPeriod period={period} setPeriod={setPeriod} />
              <PlanCurrency currency={currency} setCurrency={setCurrency} />
            </div>
            <p className="-tracking-[0.02em font-inter text-sm/[22px]">
              {' '}
              <span className="font-semibold">Save 30%</span>on a yearly
              subscription
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <PlanPriceCard plan="pro" />
            <PlanPriceCard plan="studio" />
          </div>
          <hr className="h-2.5 border-none bg-[#0000000D]" />
          <p className="font-inter text-sm/[22px] -tracking-[0.02em] text-[#575554]">
            Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Curabitur tempus urna at turpis condimentum
            lobortis. Ut commodo efficitur neque.
          </p>
        </div>
      </SheetContent>
    </Sheet>
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

const PlanPriceCard = (props: { plan: string }) => {
  const { plan } = props;

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
              'text-2xl/8 capitalize',
              plan === 'pro' && 'text-[#212121]',
            )}
          >
            {plan}
          </p>
          <p
            className={cn(
              'font-inter text-sm/[22px] -tracking-[0.02em]',
              plan === 'pro' ? 'text-[#575554]' : '#FFFFFFCC',
            )}
          >
            Everything you need to create, manage, and track guest lists.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            className={cn(
              'text-2xl/8',
              plan === 'pro' ? 'text-[#212121]' : 'text-white',
            )}
          >
            {plan === 'pro' ? '$30' : '$200'}
          </p>
          <p
            className={cn(
              'font-inter text-end text-sm/4 -tracking-[0.02em]',
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
      <div className="font-inter flex flex-col gap-5">
        {plan === 'studio' && (
          <div className="flex items-center gap-2">
            <Bolt fill={'white'} />
            <p className={cn('text-sm/[22px] -tracking-[0.02em] text-white')}>
              All Pro features
            </p>
          </div>
        )}
        {Array(plan === 'pro' ? 6 : 5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Bolt fill={plan === 'pro' ? '#874CF980' : 'white'} />
              <p
                className={cn(
                  'text-sm/[22px] -tracking-[0.02em]',
                  plan === 'pro' ? 'text-[#575554]' : 'text-white',
                )}
              >
                Morem ipsum dolor sit
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
