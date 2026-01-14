// import NoMembers from './empty-state';

import MembersList from './members-list';

const Members = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-serif text-2xl/8 text-[#212121]">Members</h1>
      {/* <NoMembers /> */}
      <MembersList />
    </div>
  );
};

export default Members;
