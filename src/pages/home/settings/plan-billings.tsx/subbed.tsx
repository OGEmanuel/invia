import Bolt from '@/assets/jsx-icons/bolt';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Subbed = () => {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="w-full max-w-85 font-serif text-2xl/8 text-[#212121]">
        Plan & Billings
      </h1>
      <ActiveCard plan="pro" expired={false} />
      <hr className="h-2.5 border-none bg-black/5" />
      <StudioPlan />
      <p className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
        Invia includes free tools to get started. Paid plans give you access to
        more powerful features for a selected period. When a plan ends, paid
        features are paused and can be re-enabled anytime by choosing a new
        plan.
      </p>
    </section>
  );
};

export default Subbed;

const ActiveCard = (props: { plan: 'studio' | 'pro'; expired: boolean }) => {
  const { plan, expired } = props;

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-[16px] border border-black/8 bg-white p-4',
        plan === 'studio' && 'border-none bg-[#3A99FF]',
      )}
    >
      <div className="flex items-center justify-between">
        <p
          className={cn(
            'font-serif text-xl/7 text-[#212121]',
            plan === 'studio' && 'text-white',
          )}
        >
          {plan.charAt(0).toUpperCase() + plan.slice(1)} plan
        </p>
        <p
          className={cn(
            'rounded-[8px] bg-[#F7F5F2] px-3 py-1 text-sm/6 -tracking-[0.02em] text-[#575554]',
            plan === 'pro' &&
              expired &&
              'bg-destructive/10 [&>span]:font-normal',
            plan === 'studio' && 'bg-black/10 text-white/90',
            plan === 'studio' && expired && 'bg-white font-medium',
            expired && 'text-destructive',
          )}
        >
          Renew on <span className="font-medium">25th Jul, 2026</span>
        </p>
      </div>
      <hr
        className={cn(
          'border-y-[0.5px] border-dashed border-black/8',
          plan === 'studio' && 'border-white/20',
        )}
      />
      <div className="flex items-center justify-between">
        <p
          className={cn(
            'text-sm/[22px] -tracking-[0.02em] text-[#575554]',
            plan === 'studio' && 'text-white/80',
          )}
        >
          Monthly plan
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant={'neutral'}
            className={cn(
              'h-9 rounded-[8px] px-3 text-sm/[22px] -tracking-[0.02em]',
              plan === 'studio' && 'border-white/20 text-white',
            )}
          >
            Billing history
          </Button>
          {expired && (
            <Button
              className={cn(
                'h-9 rounded-[8px] px-3 text-sm/[22px] -tracking-[0.02em]',
                plan === 'studio' &&
                  'bg-white text-[#212121] hover:bg-white/90',
              )}
            >
              Renew Plan
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const StudioPlan = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="rounded-[16px] bg-[#3A99FF]">
        <AccordionTrigger className="relative items-center px-2 py-3 hover:no-underline [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:right-0 [&>svg]:size-5 [&>svg]:-translate-1/2 [&>svg]:text-white/50">
          <div className="flex items-center gap-2">
            <Bolt fill={'white'} />
            <p className="text-sm/[22px] font-medium -tracking-[0.02em] text-white/80">
              Upgrade to{' '}
              <span className="font-serif text-xl/7 font-normal text-white">
                Studio plan
              </span>
            </p>
          </div>
          <Button className="mr-8 h-9 rounded-[8px] border border-white/20 bg-transparent px-3 text-sm/[22px] font-medium -tracking-[0.02em]">
            Upgrade plan
          </Button>
        </AccordionTrigger>
        <AccordionContent className="p-2 text-sm/[22px] -tracking-[0.02em] text-white/90">
          Studio is designed for planners managing larger events, bigger guest
          lists, and more complex workflows. With Studio, you get advanced
          controls, unlimited guests, and deeper visibility into guest activity.{' '}
          <br /> <br />
          Collaborate with team members, manage permissions securely, and access
          detailed timelines that help you stay in control as your events grow.{' '}
          <br /> <br />
          If you’re planning at scale or working with others, Studio gives you
          the flexibility, security, and confidence to run every event smoothly.{' '}
          <br /> <br />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
