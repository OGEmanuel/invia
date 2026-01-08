import Notice from '@/assets/jsx-icons/notice';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from '@tanstack/react-router';

const NotFound = (props: {
  className?: string;
  wrapperClassName?: string;
  header?: string;
  description?: string;
  action?: () => void;
  actionLabel?: string;
}) => {
  const navigate = useNavigate();

  const {
    className,
    wrapperClassName,
    header = '404 - Not Found',
    description = 'The page you are looking for does not exist.',
    action = () => navigate({ to: '/', search: { page: 1, limit: 12 } }),
    actionLabel = 'Go Home',
  } = props;
  return (
    <div className={cn('flex items-center justify-center', wrapperClassName)}>
      <div
        className={cn(
          'flex h-max max-w-122 flex-col items-center gap-8 text-center',
          className,
        )}
      >
        <div className="flex flex-col items-center gap-5">
          <Notice />
          <div className="flex flex-col gap-1">
            <h1 className="font-serif text-xl/7 text-[#212121]">{header}</h1>
            <p className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
              {description}
            </p>
          </div>
        </div>
        <Button onClick={action} variant={'neutral'}>
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
