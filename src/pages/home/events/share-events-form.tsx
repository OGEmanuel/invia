import Refresh from '@/assets/jsx-icons/refresh';
import ShareFormIcon from '@/assets/jsx-icons/share-form';
import { Button } from '@/components/ui/button';
import { FieldDescription, FieldGroup, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useReducer, useRef } from 'react';

type CopyType = 'link' | 'code' | null;

type CopyState = {
  copied: CopyType;
};

type CopyAction = { type: 'COPY'; payload: CopyType } | { type: 'RESET' };

const copyReducer = (state: CopyState, action: CopyAction): CopyState => {
  switch (action.type) {
    case 'COPY':
      return { copied: action.payload };

    case 'RESET':
      return { copied: null };

    default:
      return state;
  }
};

const ShareForm = () => {
  const [state, dispatch] = useReducer(copyReducer, { copied: null });
  const timeoutRef = useRef<number | null>(null);

  const handleCopy = async (text: string, type: 'link' | 'code') => {
    try {
      await navigator.clipboard.writeText(text);

      dispatch({ type: 'COPY', payload: type });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => {
        dispatch({ type: 'RESET' });
      }, 1000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center">
        <ShareFormIcon />
        <div className="flex w-full max-w-100 flex-col gap-1 text-center">
          <h3 className="font-serif text-xl/7 text-[#212121]">
            Share guest form
          </h3>
          <p className="text-sm/[22px] -tracking-[0.02em] text-[#575554]">
            Send the form link and access code for external submissions.
          </p>
        </div>
      </div>
      <FieldGroup className="gap-1.5">
        <Label
          htmlFor="formLink"
          className="text-sm/5 font-medium -tracking-[0.02em] text-[#575554]"
        >
          Form Link
        </Label>
        <FieldSet className="flex-row items-center gap-2">
          <Input
            id="formLink"
            name="formLink"
            value={
              'https://preview-cccc35a7--invitejoy-bot.lovable.app/guest-form/1'
            }
            disabled
            className="h-10 rounded-[12px] border border-black/8 bg-[#FEFCF9] px-3.5 text-ellipsis text-[#212121] shadow-none disabled:opacity-100"
          />
          <Button
            className="h-10 w-24 text-sm/[22px] font-medium -tracking-[0.02em] text-[#479FFD]"
            variant={'neutral'}
            onClick={() =>
              handleCopy(
                'https://preview-cccc35a7--invitejoy-bot.lovable.app/guest-form/1',
                'link',
              )
            }
          >
            {state.copied === 'link' ? 'Copied!' : 'Copy link'}
          </Button>
        </FieldSet>
      </FieldGroup>
      <FieldGroup className="gap-1.5">
        <Label
          htmlFor="formCode"
          className="text-sm/5 font-medium -tracking-[0.02em] text-[#575554]"
        >
          Access Passcode
        </Label>
        <FieldSet className="flex-row items-center gap-2">
          <Input
            id="formCode"
            name="formCode"
            value={'6AHPCE'}
            disabled
            className="h-10 rounded-[12px] border border-black/8 bg-[#FEFCF9] px-3.5 text-ellipsis text-[#212121] shadow-none disabled:opacity-100"
          />
          <Button
            size={'icon'}
            variant={'neutral'}
            className="size-10 rounded-[12px] px-2 [&_svg:not([class*='size-'])]:size-6"
          >
            <Refresh />
          </Button>
          <Button
            className="h-10 w-24 text-sm/[22px] font-medium -tracking-[0.02em] text-[#479FFD]"
            variant={'neutral'}
            onClick={() => handleCopy('6AHPCE', 'code')}
          >
            {state.copied === 'code' ? 'Copied!' : 'Copy Code'}
          </Button>
        </FieldSet>
        <FieldDescription className="text-sm/5 -tracking-[0.02em] text-[#575554]">
          Your client will need this passcode to access the form
        </FieldDescription>
      </FieldGroup>
      <ul className="list-inside list-disc rounded-3xl bg-[#F7F5F2] px-4 py-3 text-xs leading-6 -tracking-[0.02em] text-[#575554] sm:text-sm">
        <li>Share the form link with your client</li>
        <li>Provide them with the passcode above</li>
        <li>They can add guests directly to your event</li>
        <li>Reset the passcode anytime for security</li>
      </ul>
    </div>
  );
};

export default ShareForm;
