import EventEmptyIllustration from '@/assets/jsx-icons/event-empty-illustration';

const EmptyState = () => {
  return (
    <div className="flex w-full max-w-70 flex-col items-center gap-2 text-center sm:max-w-100">
      <EventEmptyIllustration />
      <h2 className="leading-[100%] sm:text-2xl">Create your first event</h2>
      <p className="leading-6 -tracking-[0.02em] text-[#626262] max-sm:text-sm/[22px]">
        Set up your first event to start building your guest list and sending
        invitations.
      </p>
    </div>
  );
};

export default EmptyState;
