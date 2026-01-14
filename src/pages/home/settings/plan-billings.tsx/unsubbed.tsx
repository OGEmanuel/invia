import { UpgradeContent } from '../../upgrade-modal';

const Unsubbed = () => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="w-full max-w-85 font-serif text-2xl/8 text-[#212121] sm:text-[2rem]/10">
        Get full access <br className="sm:hidden" /> to Invia & more features
      </h1>
      <UpgradeContent />
    </section>
  );
};

export default Unsubbed;
