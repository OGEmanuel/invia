// import UpgradeEmpty from './upgrade-empty';

import TemplatesEmpty from './templates-empty';

const MainContent = () => {
  return (
    <section className="flex min-h-[calc(100vh-326px)] justify-center md:min-h-[calc(100vh-297px)]">
      <div className="flex w-full items-center justify-center">
        {/* <UpgradeEmpty /> */}
        <TemplatesEmpty />
      </div>
    </section>
  );
};

export default MainContent;
