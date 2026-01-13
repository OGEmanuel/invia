import Corporate from '@/assets/jsx-icons/corporate';
import Heart from '@/assets/jsx-icons/heart';
import Others from '@/assets/jsx-icons/others';
import Party from '@/assets/jsx-icons/party';
import { cn } from '@/lib/utils';

const CategoryPill = (props: { category: string }) => {
  const { category } = props;
  return (
    <div
      className={cn(
        'flex w-max items-center gap-1 rounded-[8px] border px-3 py-2',
        category.toLowerCase() === 'wedding' &&
          'border-[#874CF933] bg-[#F9F6FF]',
        category.toLowerCase() === 'party' && 'border-[#479FFD33] bg-[#F6FAFF]',
        category.toLowerCase() === 'others' &&
          'border-[#FD843D33] bg-[#FFF9F5]',
        category.toLowerCase() === 'corporate' &&
          'border-[#2EC31B33] bg-[#F5FCF4]',
      )}
    >
      {category.toLowerCase() === 'wedding' && <Heart />}
      {category.toLowerCase() === 'party' && <Party />}
      {category.toLowerCase() === 'others' && <Others />}
      {category.toLowerCase() === 'corporate' && <Corporate />}
      <p
        className={cn(
          'text-xs/[100%] font-medium -tracking-[0.02em] capitalize',
          category.toLowerCase() === 'wedding' && 'text-[#874CF9]',
          category.toLowerCase() === 'party' && 'text-[#479FFD]',
          category.toLowerCase() === 'others' && 'text-[#FD843D]',
          category.toLowerCase() === 'corporate' && 'text-[#2EC31B]',
        )}
      >
        {category}
      </p>
    </div>
  );
};

export default CategoryPill;
