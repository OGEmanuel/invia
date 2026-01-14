import NoMembers from './empty-state';

const Members = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-serif text-2xl/8 text-[#212121]">Members</h1>
      <NoMembers />
    </div>
  );
};

export default Members;
