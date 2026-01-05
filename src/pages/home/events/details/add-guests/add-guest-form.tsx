// 122px is the height of the form description box

import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/custom/input';
import PhoneField from '@/components/ui/custom/phone';
import SelectField from '@/components/ui/custom/select';
import {
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { revalidateLogic, useField, useForm } from '@tanstack/react-form';
import { Plus, Trash2, X } from 'lucide-react';
import z from 'zod';

const addGuestFormSchema = z.object({
  guestName: z.string().min(2, {
    error: 'Please enter a valid guest name.',
  }),
  party: z.string().min(2, {
    error: 'Please select a party',
  }),
  whatsappNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    error: 'Please enter a valid WhatsApp number.',
  }),
  email: z
    .email({
      error: 'Please enter a valid email address.',
    })
    .optional(),
});

const formSchema = z.object({
  guest: z.array(addGuestFormSchema),
});

type EditGuestFormType = z.infer<typeof formSchema>;

const partyOptions = [
  { label: 'Groom', value: 'groom' },
  { label: 'Bride', value: 'bride' },
  { label: 'Event Planner', value: 'planner' },
];

const AddGuestForm = (props: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const { className } = props;

  const form = useForm({
    defaultValues: {
      guest: [
        {
          guestName: '',
          party: '',
          whatsappNumber: '',
          email: undefined,
        },
      ],
    } as EditGuestFormType,
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const guest = useField({
    name: 'guest',
    form,
  });

  return (
    <form
      id={`add-guest-form`}
      onSubmit={e => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={cn('flex w-full flex-col gap-6 p-0', className)}
    >
      <FieldSet className="_flex-row _items-center _justify-between gap-3 border-b border-black/8 pb-6">
        <FieldContent>
          <FieldLegend className="mb-2 font-serif text-xl/7 text-[#212121]">
            Event parties
          </FieldLegend>
          <FieldDescription className="text-xm/[22px] -tracking-[0.02em] text-[#575554]">
            Use event parties to organize guests into meaningful groups.
          </FieldDescription>
        </FieldContent>
        <div className="flex items-center gap-2">
          <div className="flex w-max items-center gap-1 rounded-[99px] bg-[#6155F5] px-2.5 py-1.25">
            <p className="text-sm/[22px] font-medium -tracking-[0.02em] text-white">
              Groom
            </p>
            <Button
              size={'icon'}
              type="button"
              className="size-4 rounded-none hover:bg-transparent"
              variant={'ghost'}
            >
              <X className="text-white/50" />
            </Button>
          </div>
          <div className="flex w-max items-center gap-1 rounded-[99px] bg-[#6155F5] px-2.5 py-1.25">
            <p className="text-sm/[22px] font-medium -tracking-[0.02em] text-white">
              Bride
            </p>
            <Button
              size={'icon'}
              type="button"
              className="size-4 rounded-none hover:bg-transparent"
              variant={'ghost'}
            >
              <X className="text-white/50" />
            </Button>
          </div>
          <Button
            variant={'ghost'}
            size={'icon-sm'}
            type="button"
            className="rounded-full border border-[#6155F5]/12"
          >
            <Plus className="size-5 text-[#6155F5]" />
          </Button>
        </div>
      </FieldSet>
      <FieldGroup className="h-[calc(100%-122px)] gap-6 overflow-auto">
        <form.Field
          name="guest"
          mode="array"
          children={field => {
            return (
              <FieldGroup className="gap-4">
                {field.state.value.map((_, i) => {
                  return (
                    <>
                      <>
                        <FieldSet className="items-end gap-6 sm:flex-row sm:gap-2">
                          <form.Field
                            name={`guest[${i}].guestName`}
                            children={field => {
                              const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                              return (
                                <InputField
                                  field={field}
                                  isInvalid={isInvalid}
                                  label="Guest name"
                                  placeholder="Mr & Mrs Williams’ Wedding"
                                  wrapperClassName="relative basis-full"
                                  className="h-10 w-full"
                                  errorClassName="absolute text-xs w-48! -bottom-4"
                                />
                              );
                            }}
                          />
                          <form.Field
                            name={`guest[${i}].party`}
                            children={field => {
                              const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                              return (
                                <SelectField
                                  label="Party"
                                  placeholder="Groom"
                                  isInvalid={isInvalid}
                                  field={field}
                                  options={partyOptions}
                                  wrapperClassName="sm:w-max relative"
                                  className="h-10! w-full sm:w-41"
                                  errorClassName="absolute text-xs w-48! -bottom-4"
                                />
                              );
                            }}
                          />
                          {field?.state?.value?.length > 1 && (
                            <Button
                              type="button"
                              size={'lg'}
                              variant={'ghost'}
                              onClick={() => field.removeValue(i)}
                              className="size-10 border border-black/8"
                            >
                              <Trash2 className="text-destructive size-5" />
                            </Button>
                          )}
                        </FieldSet>
                        <FieldSet className="gap-6 sm:flex-row sm:gap-2">
                          <form.Field
                            name={`guest[${i}].whatsappNumber`}
                            children={field => {
                              const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                              return (
                                <PhoneField
                                  isInvalid={isInvalid}
                                  field={field}
                                  label="WhatsApp Number"
                                  wrapperClassName="basis-full"
                                />
                              );
                            }}
                          />
                          <form.Field
                            name={`guest[${i}].email`}
                            children={field => {
                              const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                              return (
                                <InputField
                                  field={field}
                                  isInvalid={isInvalid}
                                  type="email"
                                  label="Email"
                                  placeholder="Enter email"
                                  wrapperClassName="basis-full"
                                  optional
                                />
                              );
                            }}
                          />
                        </FieldSet>
                      </>
                      {field.state.value.length - 1 !== i && (
                        <hr className="h-2.5 border-0 bg-[#F7F5F2]" />
                      )}
                    </>
                  );
                })}
              </FieldGroup>
            );
          }}
        />
        <Button
          type="button"
          onClick={() =>
            guest.pushValue({
              guestName: '',
              party: '',
              whatsappNumber: '',
              email: undefined,
            })
          }
          className="h-10 w-max self-end border border-dashed border-[#6155F5]/20 bg-[#6155F5]/8 text-[#6155F5] hover:bg-[#6155F5]/10"
        >
          <Plus className="size-5" />
          Add another guest
        </Button>
      </FieldGroup>
    </form>
  );
};

export default AddGuestForm;
