import { Button } from '@/components/ui/button';
import Banner from '../banner';
import MainContent from './main-content';
import MessagesIcon from '@/assets/jsx-icons/messages-icon';

const Messages = () => {
  return (
    <>
      <Banner
        header="Send consistent invitations faster"
        description="Create reusable templates for invitations and follow-ups across all your events."
        className="py-7 sm:[&>div]:gap-6"
      >
        <Button className="max-sm:w-max [&_svg:not([class*='size-'])]:size-6 [&>svg]:shrink-0">
          <MessagesIcon />
          New message template
        </Button>
      </Banner>
      <MainContent />
    </>
  );
};

export default Messages;
