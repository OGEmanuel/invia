import Envelope from '@/assets/jsx-icons/envelope';
import Image from '@/assets/jsx-icons/image';
import People from '@/assets/jsx-icons/people';
import Whatsapp from '@/assets/jsx-icons/whatsapp';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';
import { renderStyledVariables } from './styled-variables';

const PreviewInvitations = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  const [messageVia, setMessageVia] = useState<string[]>(['whatsapp', 'email']);

  const [files, setFiles] = useState<File[]>([]);

  // console.log("files", files);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      //   form.setValue('file', updatedFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      // const updatedFiles = [...files, ...newFiles];
      setFiles(newFiles);
      //   form.setValue("file", newFiles);
    }
  };

  //   const fileSelected = form.watch('file');
  //   console.log('selected file', fileSelected);

  //   const removeFile = (indexToRemove: number) => {
  //     const updatedFiles = files.filter((_, index) => index !== indexToRemove);
  //     setFiles(updatedFiles);
  //     // form.setValue('file', updatedFiles);
  //   };

  //   const formatFileSize = (bytes: number) => {
  //     if (bytes < 1024) return bytes + ' bytes';
  //     else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  //     else return (bytes / 1048576).toFixed(1) + ' MB';
  //   };

  return (
    <div className={'h-[calc(100%-83px)]'}>
      <div className="flex h-[calc(100%-81px)] flex-col gap-6 overflow-auto p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between rounded-[12px] bg-[#F7F5F2] p-3 text-sm/5 -tracking-[0.02em] text-[#575554]">
            <div className="flex items-center gap-2">
              <People size={24} fill={'#575554'} />
              <p>Sending to:</p>
            </div>
            <p>
              <span className="font-medium text-[#212121]">2,234</span> guests
            </p>
          </div>
          <div className="flex items-center gap-2">
            {messageVia.includes('whatsapp') && (
              <div className="flex w-max items-center gap-1 rounded-full border border-black/8 px-3 py-1.5">
                <Whatsapp fill="#45BE16" />
                <p className="text-sm/[100%] -tracking-[0.02em] text-[#212121]">
                  WhatsApp
                </p>
                {messageVia.length > 1 && (
                  <button
                    onClick={() =>
                      setMessageVia(messageVia.filter(v => v !== 'whatsapp'))
                    }
                    className="cursor-pointer transition-transform active:scale-95"
                  >
                    <X className="size-4 text-[#A3A19D]" />
                  </button>
                )}
              </div>
            )}
            {messageVia.includes('email') && (
              <div className="flex w-max items-center gap-1 rounded-full border border-black/8 px-3 py-1.5">
                <Envelope fill="#FF8D28" />
                <p className="text-sm/[100%] -tracking-[0.02em] text-[#212121]">
                  Email
                </p>
                {messageVia.length > 1 && (
                  <button
                    onClick={() =>
                      setMessageVia(messageVia.filter(v => v !== 'email'))
                    }
                    className="cursor-pointer transition-transform active:scale-95"
                  >
                    <X className="size-4 text-[#A3A19D]" />
                  </button>
                )}
              </div>
            )}
            {messageVia.length < 2 && (
              <button
                onClick={() => {
                  if (messageVia.includes('whatsapp')) {
                    setMessageVia([...messageVia, 'email']);
                  } else if (messageVia.includes('email')) {
                    setMessageVia([...messageVia, 'whatsapp']);
                  }
                }}
                className="cursor-pointer rounded-full border border-dashed border-black/8 p-2 transition-transform active:scale-95"
              >
                <Plus className="size-4 text-[#575554]" />
              </button>
            )}
          </div>
        </div>
        {/* Remember to add a remove button */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Label htmlFor="imageUpload" className="flex flex-col gap-1.5">
            <div className="flex w-full items-center justify-between text-sm/5 -tracking-[0.02em]">
              <p className="font-medium text-[#575554]">Invite cover image</p>
              <p className="text-[#A3A19D]">Optional</p>
            </div>
            <Input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex w-full items-center justify-center gap-2 rounded-[12px] border border-dashed border-black/12 py-4">
              <Image />
              <p className="text-sm/6 font-medium -tracking-[0.02em] text-[#575554]">
                Add image
              </p>
            </div>
          </Label>
        </div>
        <div className="flex items-center gap-4">
          <hr className="flex-1 border border-y-[0.5px] border-black/8" />
          <p className="font-serif leading-6 text-[#212121]">
            You are Invited!
          </p>
          <hr className="flex-1 border border-y-[0.5px] border-black/8" />
        </div>
        <div>
          {/* Add An Image preview here */}
          <p className="px-3.5 text-center leading-6 font-medium -tracking-[0.02em] text-[#212121]">
            Hi <span className="text-[#6155F5]">Mr & Mrs Ademola</span>, you are
            cordially invited to{' '}
            <span className="text-[#6155F5]">
              Mr. & Mrs. Williams' Wedding.
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <FollowUpMessages />
          <FollowUpMessages />
        </div>
      </div>
      {children}
    </div>
  );
};

export default PreviewInvitations;

const FollowUpMessages = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="item-1"
        className="flex flex-col gap-4 rounded-[12px] border! border-black/8 bg-[#FEFCF9] p-3"
      >
        <AccordionTrigger className="relative p-0 text-sm/[22px] -tracking-[0.02em] hover:no-underline max-sm:flex-col max-sm:gap-1 [&>svg]:absolute [&>svg]:top-1/2 [&>svg]:-right-3 [&>svg]:size-5 [&>svg]:-translate-1/2 [&>svg]:text-[#575554]">
          <p className="text-[#212121]">Follow-up message</p>
          <p className="pr-7 text-[#575554]">If no RSVP after 2 days</p>
        </AccordionTrigger>
        <AccordionContent className="border-t border-dashed border-black/8 p-0 pt-4 text-sm/[22px] font-medium -tracking-[0.02em] text-[#212121]">
          {renderStyledVariables(
            'Hi {guest_name}, you are cordially invited to {event_name}. Sorem ipsum dolor sit amet, consectetur adipiscing elit.',
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
