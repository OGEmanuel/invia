import { cn } from '@/lib/utils';

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse rounded-md bg-[#00000014]', className)} />
);

export default Skeleton;
