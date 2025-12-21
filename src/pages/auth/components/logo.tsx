import LogoIcon from '@/assets/jsx-icons/logo-icon';
import LogoTextIcon from '@/assets/jsx-icons/logo-text-icon';
import { cn } from '@/lib/utils';

const Logo = (props: { className?: string }) => {
  const { className } = props;
  return (
    <div className="flex items-center gap-2">
      <LogoIcon />
      <LogoTextIcon className={cn(className)} />
    </div>
  );
};

export default Logo;
