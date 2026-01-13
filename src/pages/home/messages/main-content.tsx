// import UpgradeEmpty from './upgrade-empty';
// import TemplatesEmpty from './templates-empty';

import CategoryPill from '@/components/ui/custom/category-pill';
import { Clock3, MoreVertical } from 'lucide-react';

const MainContent = () => {
  const data = [];

  for (let i = 0; i < 6; i++) {
    data.push({
      id: `${i}`,
      category:
        Math.random() > 0.3
          ? 'Wedding'
          : Math.random() > 0.5
            ? 'Party'
            : Math.random() > 0.8
              ? 'Corporate'
              : 'Others',
    });
  }

  return (
    <section className="flex min-h-[calc(100vh-326px)] justify-center max-md:px-5 md:min-h-[calc(100vh-297px)] md:max-xl:px-8">
      <div className="_items-center _justify-center flex w-full max-w-300">
        {/* <UpgradeEmpty /> */}
        {/* <TemplatesEmpty /> */}
        <div className="grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map(template => (
            <TemplateCard
              key={template.id}
              category={template.category}
              name={`${template.category} invite template`}
              description={
                'Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.'
              }
              followUp={1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainContent;

const TemplateCard = (props: {
  category: string;
  name: string;
  description: string;
  followUp?: number;
}) => {
  const { category, name, description, followUp } = props;
  return (
    <div className="flex flex-col gap-3 rounded-[12px] border border-black/8 p-5">
      <div className="flex items-center justify-between">
        <CategoryPill category={category} />
        <MoreVertical className="text-[#212121]" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-serif leading-6">{name}</p>
        <p className="line-clamp-3 text-sm/[22px] -tracking-[0.02em] text-ellipsis text-[#575554]">
          {description}
        </p>
      </div>
      {followUp && (
        <div className="flex items-center gap-2">
          <Clock3 className="size-5 text-[#A3A19D]" />
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
            <span className="font-medium text-[#212121]">{followUp}</span>{' '}
            follow-up message
          </p>
        </div>
      )}
    </div>
  );
};
