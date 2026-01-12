// 110px is the height of the footer

import Globe from '@/assets/jsx-icons/globe';
import ButtonLoading from '@/components/ui/custom/button-loading';
import InputField from '@/components/ui/custom/input';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import z from 'zod';

const formSchema = z.object({
  code: z.string().min(6, {
    error: 'Code must be 6 digits.',
  }),
});

const ShareGuestList = () => {
  const navigate = useNavigate({
    from: '/share-guest-list',
  });
  const form = useForm({
    defaultValues: {
      code: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      navigate({
        to: '/share-guest-list/$eventId',
        params: {
          eventId: '1',
        },
      });
    },
  });

  return (
    <section className="flex h-screen flex-col items-center justify-between bg-[#FEFCF9]">
      <form
        id={`share-guest-list-access-form`}
        onSubmit={e => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex h-[calc(100vh-110px)] w-full max-w-100 items-center self-center"
      >
        <FieldSet className="w-full gap-8">
          <FieldGroup className="gap-3 text-center">
            <span className="text-[#626262]">Guest list for</span>
            <FieldLegend className="font-serif text-[2rem]/10! font-normal text-[#212121]">
              Mr. & Mrs. Williams' Wedding
            </FieldLegend>
            <FieldDescription className="text-base/6 font-normal tracking-[-0.02em] text-[#626262]">
              Use this form to add guest details for this event. Please enter
              the access code provided to continue.
            </FieldDescription>
          </FieldGroup>
          <FieldGroup className="flex flex-col gap-4">
            <form.Field
              name="code"
              children={field => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <InputField
                    field={field}
                    isInvalid={isInvalid}
                    label="Access Passcode"
                    placeholder="Enter passcode"
                    type="text"
                    numberOnly
                  />
                );
              }}
            />
            <ButtonLoading
              label={'Enter'}
              isPending={false}
              className="w-full"
            />
          </FieldGroup>
        </FieldSet>
      </form>
      <footer className="flex flex-col items-center gap-2 py-6">
        <div className="flex items-center rounded-[8px] bg-[#6155F5]/10 px-1.5 py-1">
          <Globe />
          <p className="px-1 leading-6 font-medium -tracking-[0.02em] text-[#6155F5]">
            Abolaji Event Planner
          </p>
        </div>
        <span className="text-sm/[22px] -tracking-[0.02em] text-[#A3A19D]">
          tryinvia.com
        </span>
      </footer>
    </section>
  );
};

export default ShareGuestList;
