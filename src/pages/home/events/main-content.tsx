//297px is the height of the navbar + the height of the banner

import EmptyState from './empty-state';

const MainContent = () => {
  return (
    <section className="flex h-[calc(100vh-297px)] justify-center px-30">
      <div className="flex w-full max-w-360 items-center justify-center">
        <EmptyState />
      </div>
    </section>
  );
};

export default MainContent;
