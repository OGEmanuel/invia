import { Button } from '@/components/ui/button';
import { MoreVertical, Plus } from 'lucide-react';

const MEMBERS = [
  {
    name: 'Abolaji Olunuga',
    email: 'bo****@****.com',
    role: 'Owner',
  },
  {
    name: 'Sarah',
    email: 'sa****@****.com',
    role: 'Admin',
  },
  {
    name: 'Micheal P',
    email: 'mk****@****.com',
    role: 'Member',
  },
  {
    name: 'Emmanuel',
    email: 'ew****@****.com',
    role: 'Admin',
  },
];

const MembersList = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="leading-6 -tracking-[0.02em] text-[#575554]">
          Team members
        </p>
        <Button
          variant={'neutral'}
          className="h-9 rounded-[8px] border border-black/8 px-5 text-sm/[22px] font-medium -tracking-[0.02em] [&_svg:not([class*='size-'])]:size-5"
        >
          <Plus />
          Invite member
        </Button>
      </div>
      <hr className="border-y-[0.5px] border-black/8" />
      <div className="flex flex-col gap-5">
        {MEMBERS.map(member => (
          <MemberCard key={member.email} {...member} />
        ))}
      </div>
    </div>
  );
};

export default MembersList;

const MemberCard = (props: { name: string; email: string; role: string }) => {
  const { name, email, role } = props;
  return (
    <div className="flex items-center justify-between border-b border-dashed border-black/8 pb-5 text-sm/[22px] -tracking-[0.02em] last:border-b-0">
      <div className="flex basis-2/3 justify-between max-sm:flex-col sm:items-center">
        <p className="basis-full font-medium text-[#212121]">{name}</p>
        <p className="basis-full text-sm/[22px] text-[#575554] sm:text-center">
          {email}
        </p>
      </div>
      <div className="flex basis-1/3 items-center justify-end gap-1">
        <p className="rounded-[8px] border border-black/8 bg-white px-2 py-1.5 text-[#575554]">
          {role}
        </p>
        <div className="p-1">
          <MoreVertical className="size-5" />
        </div>
      </div>
    </div>
  );
};
