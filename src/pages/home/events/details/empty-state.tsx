import { cn } from '@/lib/utils';

const EmptyState = (props: {
  header: string;
  description: string;
  className?: string;
}) => {
  const {
    header = 'No guests yet',
    description = 'Guests added to this event will appear here.',
    className,
  } = props;

  return (
    <div
      className={cn(
        'flex h-80 flex-col items-center justify-center gap-2',
        className,
      )}
    >
      <h2 className="font-serif text-2xl/[100%]">{header}</h2>
      <p className="leading-6 -tracking-[0.02em] text-[#626262]">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
