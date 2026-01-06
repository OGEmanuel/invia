// 122px is the height of the form description box
// 223px is the height of the mobile prelim sections

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
import React, { useState } from 'react';
import z from 'zod';
import { AddParty, AddPartyMobileSheet } from './modals/add-party';
import { RemovePartyDialog } from './modals/remove-party';

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
  const [open, setOpen] = useState(false);

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
      className={cn('w-full max-lg:pt-5 lg:p-0', className)}
    >
      <FieldGroup className="flex-col gap-6">
        <FieldSet className="_flex-row _items-center _justify-between _max-md:px-5 gap-2 border-b border-black/8 pb-4 max-lg:mx-3.5 lg:gap-3 lg:pb-6">
          <FieldContent>
            <FieldLegend className="mb-2 text-xl/7 text-[#212121] lg:font-serif">
              Event parties
            </FieldLegend>
            <FieldDescription className="text-xm/[22px] -tracking-[0.02em] text-[#575554] max-lg:hidden">
              Use event parties to organize guests into meaningful groups.
            </FieldDescription>
          </FieldContent>
          <div className="flex items-center gap-2">
            <div className="flex w-max items-center gap-1 rounded-[99px] bg-[#6155F5] px-2.5 py-1.25">
              <p className="text-sm/[22px] font-medium -tracking-[0.02em] text-white">
                Groom
              </p>
              <RemovePartyDialog>
                <Button
                  size={'icon'}
                  type="button"
                  className="size-4 rounded-none hover:bg-transparent"
                  variant={'ghost'}
                >
                  <X className="text-white/50" />
                </Button>
              </RemovePartyDialog>
            </div>
            <div className="flex w-max items-center gap-1 rounded-[99px] bg-[#6155F5] px-2.5 py-1.25">
              <p className="text-sm/[22px] font-medium -tracking-[0.02em] text-white">
                Bride
              </p>
              <RemovePartyDialog>
                <Button
                  size={'icon'}
                  type="button"
                  className="size-4 rounded-none hover:bg-transparent"
                  variant={'ghost'}
                >
                  <X className="text-white/50" />
                </Button>
              </RemovePartyDialog>
            </div>
            <AddParty>
              <Button
                variant={'ghost'}
                size={'icon-sm'}
                type="button"
                className="rounded-full border border-[#6155F5]/12 max-sm:hidden"
              >
                <Plus className="size-5 text-[#6155F5]" />
              </Button>
            </AddParty>
            <AddPartyMobileSheet open={open} onSetOpen={setOpen}>
              <Button
                variant={'ghost'}
                size={'icon-sm'}
                type="button"
                className="rounded-full border border-[#6155F5]/12 sm:hidden"
              >
                <Plus className="size-5 text-[#6155F5]" />
              </Button>
            </AddPartyMobileSheet>
          </div>
        </FieldSet>
        <FieldGroup className="h-[calc(100vh-341px)] gap-6 overflow-auto max-lg:px-3.5 max-lg:pb-6 lg:h-[calc(100vh-283px)]">
          <form.Field
            name="guest"
            mode="array"
            children={field => {
              return (
                <FieldGroup className="gap-6 lg:gap-4">
                  {field.state.value.map((_, i) => {
                    return (
                      <React.Fragment key={i}>
                        <>
                          <FieldSet className="gap-2 sm:flex-row sm:items-end">
                            <FieldSet className="flex-row items-end gap-2 sm:basis-full">
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
                              {field?.state?.value?.length > 1 && (
                                <Button
                                  type="button"
                                  size={'lg'}
                                  variant={'ghost'}
                                  onClick={() => field.removeValue(i)}
                                  className="size-10 border border-black/8 sm:hidden"
                                >
                                  <Trash2 className="text-destructive size-5" />
                                </Button>
                              )}
                            </FieldSet>
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
                                className="size-10 border border-black/8 max-sm:hidden"
                              >
                                <Trash2 className="text-destructive size-5" />
                              </Button>
                            )}
                          </FieldSet>
                          <FieldSet className="gap-2 sm:flex-row sm:items-end">
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
                                    wrapperClassName="basis-full relative"
                                    errorClassName="absolute text-xs -bottom-4"
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
                      </React.Fragment>
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
      </FieldGroup>
      <div className="border-t border-black/8 p-5 lg:hidden">
        <Button className="h-10 w-full">Add (32) guests</Button>
      </div>
    </form>
  );
};

export default AddGuestForm;
