//297px is the height of the navbar + the height of the banner
//326px is the height of the navbar + the height of the banner for mobile

import EmptyState from './empty-state';

const MainContent = () => {
  return (
    <section className="flex min-h-[calc(100vh-326px)] justify-center md:h-[calc(100vh-297px)]">
      <div className="flex w-full max-w-300 items-center justify-center">
        <EmptyState />
      </div>
    </section>
  );
};

export default MainContent;
