import EmptyTemplate from '@/assets/jsx-icons/emty-template';

const TemplatesEmpty = () => {
  return (
    <div className="flex w-full max-w-[20rem] flex-col items-center gap-2 text-center sm:max-w-100">
      <EmptyTemplate />
      <h2 className="font-serif leading-[100%] sm:text-2xl">
        No templates available
      </h2>
      <p className="text-sm/[22px] -tracking-[0.02em] text-[#626262] sm:leading-6">
        Create a message template to reuse invitations across your events.
      </p>
    </div>
  );
};

export default TemplatesEmpty;
