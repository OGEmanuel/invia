import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const AvatarCustom = (props: {
  src: string | any;
  alt: string;
  fallback: string;
  className?: string;
}) => {
  return (
    <Avatar
      className={cn('font-inter text-white shadow-none', props.className)}
    >
      <AvatarImage
        src={props.src}
        alt={props.alt}
        className="object-cover object-top"
      />
      <AvatarFallback className="bg-[#65AEFD] font-semibold">{props.fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarCustom;
