import { cn } from '@/lib/utils';

const Banner = (props: {
  className?: string;
  header: string;
  description: string;
  children?: React.ReactNode;
}) => {
  const { className, header, description, children } = props;
  return (
    <section
      className={cn(
        'flex justify-center border-b border-[#00000014] px-30',
        className,
      )}
    >
      <div className="flex w-full max-w-360 items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-[2rem]/10 text-[#212121]">{header}</h1>
          <p className="font-inter leading-[100%] -tracking-[0.02em] text-[#626262]">
            {description}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Banner;
