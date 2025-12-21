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
        'flex justify-center border-b border-[#00000014]',
        className,
      )}
    >
      <div className="flex w-full max-w-300 justify-between max-md:px-5 max-sm:flex-col max-sm:gap-4 sm:items-center md:max-lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl/8 text-[#212121] md:text-[2rem]/10">
            {header}
          </h1>
          <p className="font-inter -tracking-[0.02em] text-[#626262] max-md:text-sm/6 md:leading-[100%]">
            {description}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Banner;
