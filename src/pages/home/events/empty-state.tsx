import EventEmptyIllustration from '@/assets/jsx-icons/event-empty-illustration';

const EmptyState = () => {
  return (
    <div className="flex w-full max-w-100 flex-col items-center gap-2 text-center">
      <EventEmptyIllustration />
      <h2 className="text-2xl/[100%]">Create your first event</h2>
      <p className="font-inter leading-6 -tracking-[0.02em] text-[#626262]">
        Set up your first event to start building your guest list and sending
        invitations.
      </p>
    </div>
  );
};

export default EmptyState;
