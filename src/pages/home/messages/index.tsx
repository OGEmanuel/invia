import Banner from '../banner';
import MainContent from './main-content';

const Messages = () => {
  return (
    <>
      <Banner
        header="Send consistent invitations faster"
        description="Create reusable templates for invitations and follow-ups across all your events."
        className="py-7"
      />
      <MainContent />
    </>
  );
};

export default Messages;
