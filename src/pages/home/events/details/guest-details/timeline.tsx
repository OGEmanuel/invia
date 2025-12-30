import User from '@/assets/jsx-icons/user';
import Whatsapp from '@/assets/jsx-icons/whatsapp';
import { Send } from 'lucide-react';

const Timeline = () => {
  return (
    <section className="flex flex-col gap-2 max-md:px-5 md:max-xl:px-8">
      <h3 className="leading-[100%] -tracking-[0.02em] text-[#212121]">
        Timeline
      </h3>
      <div>
        <div className="flex py-2 max-sm:flex-col sm:items-center sm:justify-between">
          <div className="flex items-center text-sm/[100%] text-[#222222] [&>p>span]:font-normal [&>p>span]:text-[#929292]">
            <span className="block px-2 py-1.5">
              <Whatsapp fill={'#45BE16'} />
            </span>
            <p className="p-2 font-medium">
              WhatsApp message <span>was delivered</span>
            </p>
          </div>
          <div className="flex items-center p-2 text-sm/5 -tracking-[0.02em] text-[#575554] sm:py-1.5">
            <p>11:24 PM</p>
            <span className="flex size-5 items-center justify-center">
              <span className="block size-[2.5px] rounded-full bg-[#575554]"></span>
            </span>
            <p>Jun 15, 2024</p>
          </div>
        </div>
        <hr className="border-y-[0.5px] border-dashed border-black/10" />
        <div className="flex py-2 max-sm:flex-col sm:items-center sm:justify-between">
          <div className="flex items-center text-sm/[100%] text-[#222222] [&>p>span]:font-normal [&>p>span]:text-[#929292]">
            <span className="block px-2 py-1.5">
              <Send className="size-5 text-[#AFAFAF]" />
            </span>
            <p className="p-2 font-medium">
              You <span>sent an invite message</span>
            </p>
          </div>
          <div className="flex items-center p-2 text-sm/5 -tracking-[0.02em] text-[#575554] sm:py-1.5">
            <p>11:24 PM</p>
            <span className="flex size-5 items-center justify-center">
              <span className="block size-[2.5px] rounded-full bg-[#575554]"></span>
            </span>
            <p>Jun 15, 2024</p>
          </div>
        </div>
        <hr className="border-y-[0.5px] border-dashed border-black/10" />
        <div className="flex py-2 max-sm:flex-col sm:items-center sm:justify-between">
          <div className="flex items-center text-sm/[100%] text-[#222222] [&>p>span]:font-normal [&>p>span]:text-[#929292]">
            <span className="block px-2 py-1.5">
              <User />
            </span>
            <p className="p-2 font-medium">
              Mrs & Mrs Olawale <span>was added by</span> you
            </p>
          </div>
          <div className="flex items-center p-2 text-sm/5 -tracking-[0.02em] text-[#575554] sm:py-1.5">
            <p>11:24 PM</p>
            <span className="flex size-5 items-center justify-center">
              <span className="block size-[2.5px] rounded-full bg-[#575554]"></span>
            </span>
            <p>Jun 15, 2024</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
