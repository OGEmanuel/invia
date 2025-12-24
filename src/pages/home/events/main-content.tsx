//297px is the height of the navbar + the height of the banner
//326px is the height of the navbar + the height of the banner for mobile

// import EmptyState from './empty-state';
import EventsView from './events-view';

const MainContent = () => {
  return (
    <section className="flex min-h-[calc(100vh-326px)] justify-center md:min-h-[calc(100vh-297px)]">
      <div className="_items-center _justify-center flex w-full max-w-300">
        {/* <EmptyState /> */}
        <EventsView />
      </div>
    </section>
  );
};

export default MainContent;
