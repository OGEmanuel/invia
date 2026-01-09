import { Loader2 } from 'lucide-react';
import { Button } from '../button';
import { cn } from '@/lib/utils';

const ButtonLoading = (props: {
  isPending?: boolean;
  label: string;
  onClick?: () => void;
  form?: string;
  type?: 'submit' | 'button' | 'reset';
  variant?:
    | 'secondary'
    | 'destructive'
    | 'neutral'
    | 'link'
    | 'default'
    | 'outline'
    | 'ghost'
    | null
    | undefined;
  className?: string;
}) => {
  const {
    isPending,
    label,
    form,
    onClick,
    type = 'submit',
    variant = 'default',
    className,
  } = props;
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={isPending}
      form={form}
      variant={variant}
      className={cn(
        'grid-stack grid w-max gap-0 overflow-hidden disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    >
      <span
        className={cn(
          'grid-area-stack visible translate-y-0 transition-all',
          isPending && 'invisible -translate-y-50',
          typeof label !== 'string' && 'flex items-center gap-2',
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          `grid-area-stack invisible flex w-full translate-y-50 justify-center transition-all`,
          isPending && 'visible translate-y-0',
        )}
      >
        <Loader2 aria-label="Loading" className="animate-spin" />
      </span>
    </Button>
  );
};

export default ButtonLoading;
