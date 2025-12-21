import { Button } from '@/components/ui/button';
import Banner from '../banner';
import StarCalendar from '@/assets/jsx-icons/star-calendar';
import MainContent from './main-content';

const Events = () => {
  return (
    <>
      <Banner
        header="Manage your events with elegance"
        description="Plan events effortlessly with structured guest lists and seamless invitations."
        className="pt-10 pb-5 md:pt-15 md:pb-18"
      >
        <Button className="max-sm:w-max [&_svg:not([class*='size-'])]:size-6">
          <StarCalendar />
          Create event
        </Button>
      </Banner>
      <MainContent />
    </>
  );
};

export default Events;
