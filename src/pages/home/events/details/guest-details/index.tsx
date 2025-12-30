import { useParams } from '@tanstack/react-router';
import EventDetailsLayout, {
  EventDetailsLayoutHeader,
  GuestDetails,
} from '../layout';
import Whatsapp from '@/assets/jsx-icons/whatsapp';
// import EmptyState from '../empty-state';
import Envelope from '@/assets/jsx-icons/envelope';
import Timeline from './timeline';

const GuestDetailsPage = () => {
  const { eventId } = useParams({
    from: '/$eventId',
  });
  return (
    <EventDetailsLayout>
      <EventDetailsLayoutHeader
        link={'/$eventId'}
        eventId={eventId}
        linkLabel={"Mr. & Mrs. Williams' Wedding"}
      >
        <GuestDetails header="Mr & Mrs Olawale Cole">
          <div className="flex gap-2 leading-[100%] -tracking-[0.02em] text-[#626262] max-sm:flex-col sm:items-center">
            <div className="flex items-center gap-1">
              <Whatsapp />
              <p>+234 9038229333</p>
            </div>
            <a
              href="mailto:bojnuga@gmail.com"
              className="flex items-center gap-1"
            >
              <Envelope fill={'#626262'} />
              <p>bojnuga@gmail.com</p>
            </a>
          </div>
        </GuestDetails>
      </EventDetailsLayoutHeader>
      <hr className="border-y-[0.5px] border-[#00000014] max-md:mx-5 md:max-xl:mx-8" />
      {/* <EmptyState
        header="No invites yet"
        description="Send an invite to this guest."
      /> */}
      <Timeline />
    </EventDetailsLayout>
  );
};

export default GuestDetailsPage;
