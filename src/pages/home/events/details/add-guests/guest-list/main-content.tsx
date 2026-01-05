import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import GuestActions from '../../guest-actions';

const MainContent = () => {
  return (
    <div className="flex flex-col gap-3 p-4">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <GuestCard key={i} />
        ))}
    </div>
  );
};

export default MainContent;

const GuestCard = () => {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-black/8 pb-3 last:border-b-0">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm/5 font-medium -tracking-[0.02em] text-[#212121]">
          Mr. Abolaji
        </p>
        <div className="flex items-center text-sm/5 -tracking-[0.02em] text-[#575554]">
          <p>+2347048099032</p>
          <span className="flex size-5 items-center justify-center">
            <span className="block size-[2.5px] rounded-full bg-black"></span>
          </span>
          <p>bojnuga.emire@gmail.com</p>
        </div>
      </div>
      <GuestActions asChild>
        <Button className="size-5 rounded-none" variant={'ghost'} size={'icon'}>
          <MoreVertical className="size-5 text-[#575554]" />
        </Button>
      </GuestActions>
    </div>
  );
};
